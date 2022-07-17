<script>
	import { session } from '$app/stores';
	import { post } from '$lib/api';
	import { goto } from '$app/navigation';
	import { alert } from '$lib/stores';
	let user = {
		name: 'Benjamin',
		second_name: 'Gomez',
		email: 'benjamin.gomez@inacapmail.cl',
		rut: '5.126.663-3',
		password: '123123',
		repeat_password: '123123'
	};
	let errors = null;
	async function submit(event) {
		for await (const [name, value] of Object.entries(user)) {
			if (!value) {
				errors = ['Debes completar todos los campos'];
				return;
			}
		}
		const response = await post(`auth/register`, { user });
		if (response.errors) {
			$alert = { msg: response.errors[0], type: 'error' };
			setTimeout(() => {
				$alert = false;
			}, 2500);
		}
	}
</script>

<div class="max-w-md m-auto w-full bg-base-100 rounded-xl">
	<form on:submit|preventDefault={submit}>
		<div class=" flex flex-col gap-2 py-8 px-6 md:px-14  ">
			<div>
				<div class="text-3xl font-bold">Registro</div>
				<span class="text-sm">
					<span>Ya tienes cuenta?</span>

					<a href="/login" class="link link-secondary">Ingresar</a>
				</span>
			</div>
			{#if errors}
				{#each errors as item}
					<div class="text-red-600">
						- {item}
					</div>
				{/each}
				<!-- content here -->
			{/if}
			<div class="w-full">
				<div class="text-sm font-semibold ">Nombre</div>
				<input bind:value={user.name} type="text" class="input  input-bordered  w-full " />
			</div>
			<div class="w-full">
				<div class="text-sm font-semibold ">Apellido</div>
				<input bind:value={user.second_name} type="text" class="input  input-bordered  w-full " />
			</div>
			<div class="w-full">
				<div class="text-sm font-semibold ">Correo electronico</div>
				<input bind:value={user.email} type="text" class="input  input-bordered  w-full " />
			</div>
			<div class="w-full">
				<div class="text-sm font-semibold ">RUT</div>
				<input bind:value={user.rut} type="text" class="input  input-bordered  w-full " />
			</div>
			<div class="w-full">
				<div class="text-sm font-semibold ">Clave</div>
				<input bind:value={user.password} type="text" class="input  input-bordered  w-full " />
			</div>
			<div class="w-full">
				<div class="text-sm font-semibold ">Repetir Clave</div>
				<input
					bind:value={user.repeat_password}
					type="text"
					class="input  input-bordered  w-full "
				/>
			</div>
			<button class="btn btn-accent btn-block rounded-full mt-2" on:click={() => {}}
				>Registrarse</button
			>
		</div>
	</form>
</div>
