<script>
	import { page } from '$app/stores';
	import { post } from '$lib/api';
	import { alert } from '$lib/stores';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let order;
	let es_factura = false;

	let bussiness = {
		name: '',
		rut: '',
		type: '',
		address: ''
	};

	async function finishSale(sale_type) {
		let data = await post(`seller/sale/${$page.params.order_id}`, { sale_type, bussiness });

		if (data.order.length) {
			$alert = { msg: 'Venta completada', type: 'success' };
			setTimeout(() => {
				$alert = false;
			}, 2000);
			dispatch('finishOrder');
		}
	}
</script>

{#if order.products.length}
	<!-- content here -->

	{#if !order.completed}
		<!-- content here -->

		<div class="grid md:grid-cols-2 gap-8  p-2 mt-6 ">
			<div
				class="flex p-2 rounded bg-slate-100 border  border-slate-200  items-center  w-full cursor-pointer duration-200 transition-all"
				on:click={() => {
					es_factura = false;
				}}
				class:ring={!es_factura}
				class:ring-slate-600={!es_factura}
				class:bg-slate-300={!es_factura}
			>
				<input type="radio" name="radio-2" class="radio radio-primary" checked={!es_factura} />
				<div class=" font-bold text-2xl text-center w-full">Boleta</div>
			</div>
			<div
				class="flex p-2 rounded bg-slate-100 border  border-slate-200 items-center cursor-pointer duration-200 transition-all"
				class:ring={es_factura}
				class:ring-slate-600={es_factura}
				class:bg-slate-300={es_factura}
				on:click={() => {
					es_factura = true;
				}}
			>
				<input type="radio" name="radio-2" class="radio radio-primary" checked={es_factura} />
				<div class=" font-bold text-2xl text-center w-full">Factura</div>
			</div>
		</div>
		<div class="flex flex-col items-center  w-full p-2">
			{#if es_factura}
				<div class="flex flex-col gap-2 w-full items-center mb-4">
					<input
						type="text"
						bind:value={bussiness.name}
						placeholder="Nombre Empresa"
						class="input input-bordered w-full max-w-xs"
					/>
					<input
						type="text"
						bind:value={bussiness.rut}
						placeholder="Rut"
						class="input input-bordered w-full max-w-xs"
					/>
					<input
						type="text"
						bind:value={bussiness.type}
						placeholder="Giro"
						class="input input-bordered  w-full max-w-xs"
					/>
					<input
						type="text"
						bind:value={bussiness.address}
						placeholder="Direccion "
						class="input input-bordered w-full max-w-xs"
					/>
				</div>
				<button
					class="btn btn-primary"
					on:click={() => {
						finishSale('Factura');
					}}>Generar venta factura</button
				>
			{/if}
			{#if !es_factura}
				<button
					class="btn btn-primary"
					on:click={() => {
						finishSale('Boleta');
					}}>Generar venta boleta</button
				>
			{/if}
		</div>
	{/if}
{/if}
