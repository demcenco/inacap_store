<script context="module">
	import dayjs from 'dayjs';

	export let filter = {
		page: 1,
		per_page: 15,
		seller_id: 0,
		sale_type: null,
		start_date: new Date(dayjs().subtract(60, 'day')),
		end_date: new Date()
	};
	let hashParams = new URLSearchParams(filter).toString();

	export async function load({ fetch }) {
		let res = await fetch(`/api/admin/reports?${hashParams}`);
		let { data } = await res.json();

		return { props: { data, filter } };
	}
</script>

<script>
	import { get } from '$lib/api';
	import FilterReports from './_FilterReports.svelte';
	import ReportPagination from './_ReportPagination.svelte';

	export let data, filter;
	export let { orders, total_items, sellers } = data[0];

	async function getData() {
		let hashParams = new URLSearchParams(filter).toString();
		const { data } = await get(`admin/reports?${hashParams}`);
		total_items = data[0].total_items;
		orders = data[0]?.orders;
	}
</script>

<div class="flex flex-col gap-4 bg-base-100 p-4 rounded-lg shadow-xl   w-full">
	<FilterReports on:updateData={getData} bind:filter bind:sellers />
	<div class=" overflow-x-auto p-4">
		<table
			class="table w-full  table-compact ring ring-slate-400 ring-opacity-40  rounded-lg shadow-lg  overflow-x-auto "
		>
			<!-- head -->
			<thead>
				<tr>
					<th style="z-index: 0; position:relative" class="relative">Fecha</th>
					<th>Total Ventas </th>
					<th>Total Boletas</th>
					<th>Total Facturas</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{#if orders}
					<!-- content here -->

					<!-- row 1 -->
					{#each orders as item}
						<!-- content here -->
						<tr>
							<td>{dayjs(item.closed_at).format('DD-MM-YYYY')}</td>
							<td>
								{item.total_ventas}
							</td>
							<td>
								{item.boletas}
							</td>
							<td>
								{item.facturas}
							</td>
							<td>
								<a
									class="btn btn-primary btn-xs"
									href={`/admin/reports/${item.closed_at}?seller_id=${filter.seller_id}`}>Detalle</a
								>
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
	{#if orders}
		<!-- content here -->
		<ReportPagination on:changePage={getData} bind:pagination={filter} bind:total_items />
	{/if}
</div>
