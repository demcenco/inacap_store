<script context="module">
	export async function load({ params, fetch }) {
		const res = await fetch(`/api/seller/sale/${params.order_id}`);
		const { order } = await res.json();

		return {
			props: {
				order
			}
		};
	}
</script>

<script>
	import { del, get, post, put } from '$lib/api';
	import { page } from '$app/stores';
	import SearchProduct from './_SearchProduct.svelte';
	import ProductsTable from './_ProductsTable/index.svelte';
	import OrderPayment from './_OrderPayment.svelte';
	import OrderDetails from './_OrderDetails.svelte';
	import NormalInvoice from './_Invoice/_InvoiceTemplate.svelte';
	import BussinessInvoice from './_Invoice/_BussinessInvoice.svelte';

	let refresh;
	let sum_total;
	export let order;

	async function getData() {
		let data = await get(`seller/sale/${$page.params.order_id}`);
		order = data.order;
		refresh = !refresh;
	}

</script>

{#if order.completed}
	{#if order.sale.length}
		<!-- content here -->
		<BussinessInvoice bind:order />
	{:else}
		<!-- else content here -->
		<NormalInvoice bind:order />
	{/if}
{:else}
	<div class="flex flex-col max-w-4xl w-full mx-auto bg-base-100 rounded-xl mt-4 p-4 md:p-14">
		<OrderDetails bind:order />
		<SearchProduct on:updateOrder={getData} />
		<ProductsTable on:updateTable={getData} bind:order />
		<OrderPayment bind:order on:finishOrder={getData} />
	</div>
{/if}
