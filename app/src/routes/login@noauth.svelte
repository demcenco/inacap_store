<script>
	import { session } from '$app/stores';
	import { post } from '$lib/api';
	import { goto } from '$app/navigation';
	let username = 'benjamin.gomez@inacapmail.cl';
	let password = '123123';
	let errors = null;
	async function submit(event) {
		const response = await post(`auth/login`, { username, password });
		if (response.errors) {
			errors = response.errors;
		}

		if (response.user) {
			$session.user = response.user;
			if (response.user.user_type == 2) {
				goto('/seller');
			}
			if (response.user.user_type == 1) {
				goto('/admin');
			}
		}
	}
</script>

<div class="flex flex-col flex-auto items-center justify-center  w-full  max-w-md m-auto">
	<div class="flex flex-col py-8 px-4 md:px-14 space-y-4 bg-base-100 rounded-xl   w-full">
		<div>
			<div class="text-3xl font-bold">Ingresar</div>
			<span class="text-sm">
				<span>No tienes cuenta?</span>

				<a href="/register" class="link link-secondary">Registrarse</a>
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
		<div class="pt-2">
			<form on:submit|preventDefault={submit}>
				<div class="form-control w-full ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span class="label-text font-semibold">Nombre de usuario o correo</span>
					</label>
					<input bind:value={username} type="text" class="input input-bordered w-full " />
				</div>
				<div class="form-control w-full ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span class="label-text font-semibold">Clave</span>
					</label>
					<input bind:value={password} type="password" class="input input-bordered w-full " />
				</div>
				<div class="flex flex-col md:flex-row items-center justify-between  mt-4">
					<div class="form-control">
						<label class="label cursor-pointer">
							<input type="checkbox" checked="checked" class="checkbox checkbox-primary" />
							<span class="label-text pl-4">Recordar me</span>
						</label>
					</div>
					<div>
						<a href="/forgot" class="link text-sm"> Se me olvido la clave </a>
					</div>
				</div>
				<button class="btn btn-accent btn-block rounded-full mt-2" type="submit">Ingresar</button>
			</form>
			<button
				class="btn btn-accent btn-block rounded-full mt-2"
				on:click={() => {
					username = 'admin';
					submit();
				}}>Ingresar Admin</button
			>
		</div>
	</div>
</div>
