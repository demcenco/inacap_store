<script>
	import { get, post } from '$lib/api';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import { page } from '$app/stores';
	export let search;
	export let data;
	import { alert } from '$lib/stores';

	async function searchProduct() {
		const { products } = await get(`product?search=${search}`);
		data = products;
	}
	async function addProduct(item) {
		const data = await post(`seller/sale/${$page.params.order_id}/product`, {
			product_id: item.product_id,
			amount: item.amount,
			price: item.price
		});
		if (data.error) {
			$alert = { msg: data.error, type: 'error' };
			setTimeout(() => {
				$alert = false;
			}, 2500);
		} else {
			dispatch('updateOrder');
		}
	}
</script>

<div class="form-control my-4 m-auto w-full md:w-1/2">
	<div class="dropdown">
		<div class="input-group w-full">
			<input
				on:input={() => searchProduct()}
				bind:value={search}
				type="text"
				placeholder="Buscar Producto"
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

		{#if data && data.length}
			<div
				tabindex="0"
				class="dropdown-content mt-2 card rounded-t-none card-compact w-full p-2 bg-base-100 ring ring-slate-500 text-base shadow-xl"
			>
				{#each data as item}
					<div
						class="grid md:grid-cols-4 justify-center gap-2 p-2 border-b last:border-b-0 border-slate-400 text-sm items-center    font-semibold "
					>
						<div>
							{item.name} - {item.brand}
						</div>

						<input
							type="number"
							placeholder="Cantidad"
							class="input input-bordered input-sm w-20"
							bind:value={item.amount}
						/>

						<div>
							${item.price}
						</div>
						<button
							class="btn btn-primary btn-xs"
							on:click={() => {
								addProduct(item);
							}}
						>
							Agregar
						</button>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
