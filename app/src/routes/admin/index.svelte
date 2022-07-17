<script context="module">
	export async function load({ fetch }) {
		let res = await fetch('/api/admin/shift');
		let { shift } = await res.json();

		return { props: { shift } };
	}
</script>

<script>
	import { post, put } from '$lib/api';
	import dayjs from 'dayjs';
	export let shift;
	let shift_status = shift.length ? { ...shift[0] } : null;

	async function closeShift(shift_id) {
		await put('admin/shift', { shift_id });
		shift_status = await null;
	}
	async function startShift() {
		let { data } = await post('admin/shift');
		shift_status =  await { ...data[0] };
	}
</script>

<div class="grid md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
	<div class=" flex items-center justify-center bg-base-100  rounded-xl p-8">
		{#if shift_status}
			<div class="flex flex-col  gap-5 justify-center items-center">
				<div class="text-2xl font-semibold text-teal-600">
					Turno Activo #{shift_status.shift_id}
				</div>
				<div class="text-lg font-semibold">
					Inicio: {dayjs(shift_status.started_at).format('YYYY-MM-DD HH:mm:ss')}
				</div>
				<div>
					<button
						class="btn btn-warning"
						on:click={() => {
							closeShift(shift_status.shift_id);
						}}
					>
						Cerrar Turno
					</button>
				</div>
			</div>
		{:else}
			<div class="flex flex-col  gap-5 justify-center items-center">
				<div class="text-2xl font-semibold text-rose-600">No hay turnos activos</div>

				<div>
					<button
						class="btn btn-primary"
						on:click={() => {
							startShift();
						}}
					>
						Iniciar Turno
					</button>
				</div>
			</div>
		{/if}
	</div>

	<div class="bg-base-100 rounded-xl p-8">
		<div class="flex items-start justify-between">
			<div class="text-lg font-medium tracking-tight leading-6 truncate text-center">
				Ventas hoy
			</div>
		</div>
		<div class="flex flex-col items-center mt-2">
			<div class="text-7xl sm:text-8xl font-bold tracking-tight leading-none text-blue-500">21</div>
			<div class="text-lg font-medium text-blue-600 dark:text-blue-500">Total</div>
			<div class="flex items-baseline justify-center w-full mt-5 text-secondary">
				<div class="text-md font-medium truncate">Abiertas:</div>
				<div class="ml-1.5 text-lg font-semibold">13</div>
			</div>
		</div>
	</div>
</div>
