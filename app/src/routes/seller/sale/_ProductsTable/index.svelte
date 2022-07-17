<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import { del, put } from '$lib/api';
	import { page } from '$app/stores';
	import { alert } from '$lib/stores';
	import OrderSum from './_OrderSum.svelte';
	import { formato } from '$lib/utils';

	export let order;
	async function updateProduct(item) {
		await put(`seller/sale/${$page.params.order_id}/product`, { item });
		$alert = { msg: 'Se actualizo el producto', type: 'success' };
		setTimeout(() => {
			$alert = false;
		}, 2500);
		dispatch('updateTable');
	}
	async function deleteProduct(item) {
		await del(`seller/sale/${$page.params.order_id}/product?id=${item.order_product_id}`);
		$alert = { msg: 'Se elimino el producto', type: 'warning' };
		setTimeout(() => {
			$alert = false;
		}, 2500);
		dispatch('updateTable');
	}
</script>

<div
	class=" flex  items-center justify-center mt-4 w-full ring-[2px] rounded-lg  ring-slate-400 ring-opacity-60 "
>
	<div class="overflow-x-auto w-full max-w-5xl pb-2">
		<table class="table  table-compact w-full  font-semibold  ">
			<!-- head -->
			<thead>
				<tr>
					<th>ID</th>
					<th>Producto</th>
					<th>Precio</th>
					<th>Cantidad</th>
					<th>Total</th>
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				{#each order.products as item (item.product_id)}
					<!-- content here -->

					<tr>
						<td>{item.product_id} </td>
						<td>{item.name} </td>
						<td>$ {formato(item.price)}</td>

						<td>
							{#if order.completed}
								{item.amount}
							{:else}
								<input
									type="number"
									class="input input-xs input-bordered"
									bind:value={item.amount}
								/>
							{/if}
						</td>
						<td>$ {formato(item.amount * item.price)}</td>
						{#if !order.completed}
							<td>
								<button class="btn btn-xs" on:click={() => updateProduct(item)}>
									Actualizar
								</button>
								<button class="btn btn-xs" on:click={() => deleteProduct(item)}> Eliminar </button>
							</td>
						{/if}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
<div class="grid md:grid-cols-3">
	<div class=" md:col-start-3">
		<OrderSum bind:order />
	</div>
</div>
