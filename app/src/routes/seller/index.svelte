<script context="module">
	import { userFullName, userCode } from '$lib/stores';
	export async function load({ fetch, url }) {
		let pagination = {
			page: url.searchParams.get('page') ? url.searchParams.get('page') : 1,
			per_page: url.searchParams.get('per_page') ? url.searchParams.get('per_page') : 15
		};
		let search = new URLSearchParams(pagination).toString();
		let [res1, res2] = await Promise.all([
			fetch('/api/seller'),
			fetch(`/api/seller/sale?${search}`)
		]);

		let { shift } = await res1.json();
		let data = await res2.json();
		if (shift[0]) {
			await userFullName.set(shift[0].name);
			await userCode.set(shift[0].user_id);
		}

		return { props: { shift: shift[0], data, pagination } };
	}
</script>

<script>
	import { goto } from '$app/navigation';
	import { post } from '$lib/api';
	export let shift, data, pagination;

	import SalesTable from './_SalesTable.svelte';
	async function startSale() {
		const { order_id } = await post('seller/sale');
		goto(`/seller/sale/${order_id}`);
	}
</script>

<div class="grid md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 max-w-5xl w-full mx-auto mt-4">
	{#if !shift.shift}
		<div
			class="col-span-2 md:col-span-1 bg-base-100 flex flex-col items-center justify-center rounded-xl p-8  text-2xl"
		>
			<div class=" font-bold text-yellow-500">No puede iniciar ventas</div>
			<div class=" font-bold text-yellow-500">El turno actual esta cerrado</div>
		</div>
	{/if}
	{#if shift.shift}
		<label
			for="my-modal1"
			class="col-span-2 md:col-span-1 btn btn-primary h-full w-full text-3xl font-bold  rounded-xl p-8"
			>Iniciar venta</label
		>

		<input type="checkbox" id="my-modal1" class="modal-toggle" />
		<label for="my-modal1" class="modal cursor-pointer">
			<label class="modal-box relative" for="">
				<button
					class="btn btn-primary h-full w-full text-3xl  rounded-xl p-8 "
					on:click={startSale}
				>
					INICIAR VENTA
				</button>
			</label>
		</label>
	{/if}

	<div class="bg-base-100 rounded-xl p-8 col-span-2 md:col-span-1 ">
		<div class="flex items-start justify-center">
			<div class="text-xl  tracking-tight leading-6 truncate font-bold">Ventas hoy</div>
		</div>
		<div class="flex flex-col items-center mt-2">
			<div class="text-4xl sm:text-6xl font-bold tracking-tight leading-none text-blue-500">
				{shift.length ? shift.sales.total : 0}
			</div>
			<div class="text-lg font-medium text-blue-600 dark:text-blue-500">Total</div>
			<div class="flex items-baseline justify-center w-full mt-5 text-secondary">
				<div class="text-md font-medium truncate">Abiertas:</div>
				<div class="ml-1.5 text-lg font-semibold">
					{shift.length ? shift.sales.total - shift.sales.completed : 0}
				</div>
			</div>
		</div>
	</div>
	{#if data?.orders?.length}
		<div class="bg-base-100 col-span-2 p-4 flex flex-col items-center w-full rounded-xl overflow-x-auto">
			<div class="font-bold text-lg">Ventas del turno actual</div>
			<SalesTable bind:data bind:pagination />
		</div>
		<!-- content here -->
	{:else}
		<div
			class="overflow-x-auto w-full max-w-5xl mx-auto p-6  h-32 rounded-xl  bg-base-100  col-span-2"
		>
			<div class="flex  items-center justify-center h-full">
				<div class="text-xl font-semibold">No se han realizado ventas durante este turno</div>
			</div>
		</div>
	{/if}
</div>
