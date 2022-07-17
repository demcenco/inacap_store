<script>
	import { get, post } from '$lib/api';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import { page } from '$app/stores';
	export let search;
	export let data;
	async function searchProduct() {
		const { products } = await get(`product?search=${search}`);
		data = products;
	
	}
</script>

<div class="form-control my-2 m-auto w-1/2">
	<div class="font-bold text-center">Buscar Productos</div>
	<div class="dropdown">
		<div class="input-group w-full">
			<input
				on:input={() => searchProduct()}
				bind:value={search}
				type="text"
				placeholder="Ej: Pan"
				class="input  w-full bg-base-200"
			/>
			<button tabindex="0" class="btn btn-square" on:click={searchProduct}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/></svg
				>
			</button>
		</div>
	</div>
</div>
