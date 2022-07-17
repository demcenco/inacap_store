<script>
	export let filter;
	export let sellers;

	import { DateInput } from 'date-picker-svelte';

	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();
	async function generarReporte() {
		filter.page = 1;
		dispatch('updateData');
	}
</script>

<div class="flex flex-col  md:items-end  justify-center md:flex-row gap-2 md:gap-5">
	<div class="flex  items-center justify-center gap-4 w-full md:w-fit">
		<div class="form-control  max-w-xs">
			<label class="label">
				<span class="label-text font-semibold -mb-1 text-sm ">Fecha inicio</span>
			</label>
			<DateInput closeOnSelection="true" bind:value={filter.start_date} format="dd-MM-yyyy" />
		</div>
		<div class="form-control  max-w-xs">
			<label class="label">
				<span class="label-text font-semibold -mb-1 text-sm ">Fecha final</span>
			</label>
			<DateInput closeOnSelection="true" bind:value={filter.end_date} format="dd-MM-yyyy" />
		</div>
	</div>
	<div class="form-control  ">
		<label class="label">
			<span class="label-text font-semibold -mb-1 text-sm ">Filtrar por vendedor</span>
		</label>
		<select class="select select-sm w-full select-bordered">
			<option on:click={() => (filter.seller_id = 0)} selected>Todos los vendedores</option>
			{#each sellers as item}
				<option on:click={() => (filter.seller_id = item.user_id)}>{item.seller}</option>
			{/each}
		</select>
	</div>
	<button class="btn btn-sm " on:click={generarReporte}> Filtrar </button>
</div>
