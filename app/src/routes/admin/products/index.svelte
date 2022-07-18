<script>
	import { post } from '$lib/api';
	import { alert } from '$lib/stores';
	import ProductsTable from './_ProductsTable.svelte';
	import SearchProduct from './_SearchProduct.svelte';
	export let products;
	let producto = {
		nombre: '',
		marca: '',
		descripcion: '',
		precio: 0
	};
	async function agregarProducto() {
		const data = await post('admin/products', { producto });

		if (data.error) {
			setTimeout(() => {
				$alert = false;
			}, 2000);
			$alert = { msg: data.error, type: 'error' };
		} else {
			setTimeout(() => {
				$alert = false;
			}, 2000);
			$alert = { msg: 'Producto ingresado', type: 'success' };
			producto = {
				nombre: '',
				marca: '',
				descripcion: '',
				precio: 0
			};
		}
	}
</script>

<div class="p-3 bg-base-100 rounded-lg  max-w-xl m-auto shadow-xl mt-2">
	<div class="bg-base-100 p-2 md:p-6 rounded-xl ">
		<div class="text-center font-bold text-2xl ">Ingresar producto al inventario</div>
		<div class="space-y-4 mt-3">
			<span>Nombre</span>

			<input
				bind:value={producto.nombre}
				type="text"
				placeholder="Nombre Producto"
				class="input input-bordered input-primary w-full"
			/>
			<span>Marca</span>
			<input
				bind:value={producto.marca}
				type="text"
				placeholder="Marca Producto"
				class="input input-bordered input-primary w-full"
			/>
			<span class="-mb-2 mt-1">Descripcion</span>

			<input
				bind:value={producto.descripcion}
				type="text"
				placeholder="Descripcion"
				class="input input-bordered input-primary w-full"
			/>
			<span>Precio</span>

			<input
				bind:value={producto.precio}
				type="number"
				placeholder="Precio"
				class="input input-bordered input-primary w-full"
			/>
		</div>
		<div class="flex w-full items-center justify-center">
			<button on:click={agregarProducto} class="btn btn-primary mt-4"> Ingresar Producto </button>
		</div>
	</div>
	<SearchProduct bind:data={products} />
	<ProductsTable bind:products />
</div>
