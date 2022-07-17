<script>
	import { session } from '$app/stores';
	import { post } from '$lib/api';

	async function logOut() {
		await post('auth/logout');
		$session.user = null;
	}
</script>

<div class="navbar bg-base-100 dontPrint">
	<div class="navbar-start">
		<a href="/" class=" flex  btn btn-ghost normal-case font-bold text-lg  md:text-3xl">
			<span class=" align-middle md:h-full">
				Inacap<span class="text-primary">Store</span>
			</span>
			<div class=" hidden md:flex items-center h-full ml-1">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
					/>
				</svg>
			</div>
		</a>
	</div>

	{#if $session && $session?.user?.user_type == 'admin'}
		<div class="hidden md:flex">
			<a href="/admin" sveltekit:prefetch class="btn btn-ghost normal-case text-lg">Turno</a>
			<a href="/admin/users" sveltekit:prefetch class="btn btn-ghost normal-case text-lg"
				>Vendedores</a
			>
			<a href="/admin/products" class="btn btn-ghost normal-case text-lg">Inventario</a>
			<a href="/admin/reports" class="btn btn-ghost normal-case text-lg">Reportes</a>
		</div>
	{/if}
	<div class="hidden md:flex  navbar-end space-x-2">
		{#if !$session.user?.user_type}
			<!-- content here -->

			<a href="/login" class="btn  btn-sm"> Ingresar</a>
			<a href="/register" class="btn btn-sm"> Registrarse</a>
		{:else}
			<ul class="menu menu-horizontal p-0" />

			<button on:click={logOut} class="btn btn-warning btn-sm"> Salir </button>
		{/if}
	</div>
	<div class=" md:hidden navbar-end space-x-2">
		<div class="flex justify-end flex-1 px-2">
			<div class="flex items-stretch">
				<div class="dropdown dropdown-end">
					<label tabindex="0" class="btn btn-ghost rounded-btn">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							class="inline-block w-5 h-5 stroke-current"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/></svg
						></label
					>
					<ul
						tabindex="0"
						class="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4 font-semibold"
					>
						{#if $session && $session?.user?.user_type == 'admin'}
							<li>
								<a href="/admin">Turno</a>
							</li>
							<li>
								<a href="/admin/users">Vendedores</a>
							</li>
							<li>
								<a href="/admin/products">Inventario</a>
							</li>
							<li>
								<a href="/admin/reports">Reportes</a>
							</li>
						{/if}
						{#if !$session.user?.user_type}
							<!-- content here -->
							<li>
								<a href="/login"> Ingresar</a>
							</li>
							<li>
								<a href="/register"> Registrarse</a>
							</li>
						{:else}
							<li >
								<button on:click={logOut} class=" h-full btn btn-warning align-top  btn-xs mt-1 font-bold">
									Salir
								</button>
							</li>
							<ul class="menu menu-horizontal p-0" />
						{/if}
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
