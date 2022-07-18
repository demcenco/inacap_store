<script>
	import { del, post, put } from '$lib/api';
	import { alert } from '$lib/stores';

	export let products;
	async function updateProduct(product) {
		const data = await put(`admin/products`, { product });
		if (data.error) {
			setTimeout(() => {
				$alert = false;
			}, 2000);
			$alert = { msg: data.error, type: 'error' };
		}
	}
	async function deleteProduct(product_id, index) {
		await del(`admin/products?product_id=${product_id}`);
		products.splice(index, 1);
		products = [...products];
	}
</script>

{#if products?.length}
	<div class="overflow-x-auto">
		<table class="table w-full">
			<!-- head -->
			<thead>
				<tr>
					<th>Codigo </th>
					<th>Nombre</th>
					<th>Descripcion</th>
					<th>Marca</th>
					<th>Precio</th>
					<th>Stock</th>
					<th>Accion</th>
				</tr>
			</thead>
			<tbody>
				{#each products as item, index}
					{#if !item.edit}
						<!-- content here -->

						<tr>
							<th>{item.product_id}</th>
							<td>{item.name}</td>
							<td>{item.desc}</td>
							<td>{item.brand}</td>
							<td>{item.price}</td>
							<td>{item.stock}</td>
							<td>
								<button class="btn btn-xs" on:click={() => (item.edit = !item.edit)}>
									Editar
								</button>
								<button class="btn btn-xs" on:click={() => deleteProduct(item.product_id, index)}>
									Eliminar
								</button>
							</td>
						</tr>
					{:else}
						<tr>
							<th>{item.product_id}</th>
							<td>
								<input
									type="text"
									class="input input-sm input-bordered w-16"
									bind:value={item.name}
								/></td
							>
							<td>
								<input
									type="text"
									class="input input-sm input-bordered w-16"
									bind:value={item.desc}
								/></td
							>
							<td>
								<input
									type="text"
									class="input input-sm input-bordered w-16"
									bind:value={item.brand}
								/></td
							>
							<td>
								<input
									type="number"
									class="input input-sm input-bordered w-16"
									bind:value={item.price}
								/></td
							>
							<td>
								<input
									type="number"
									class="input input-sm input-bordered w-16"
									bind:value={item.stock}
								/></td
							>
							<td>
								<button
									class="btn btn-xs"
									on:click={async () => {
										await updateProduct(item);
										item.edit = false;
									}}
								>
									Guardar
								</button>
							</td>
						</tr>
					{/if}
				{/each}
			</tbody>
		</table>
	</div>
	<!-- content here -->
{/if}
