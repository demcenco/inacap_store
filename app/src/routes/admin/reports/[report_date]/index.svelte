<script context="module">
	import { conIva, formato, iva, sinIva } from '$lib/utils';
	import dayjs from 'dayjs';

	export async function load({ fetch, params, url }) {
		let res = await fetch(
			`/api/admin/reports/detailed?date=${params.report_date}&seller_id=${url.searchParams.get(
				'seller_id'
			)}`
		);

		let { data } = await res.json();

		return { props: { data } };
	}
</script>

<script>
	import { get } from '$lib/api';

	import SaleDetails from './_SaleDetails.svelte';
	export let data;
	export let { orders, total_items } = data[0];
	async function getDetails(order_id) {
		const { data } = await get(`admin/reports/detailed/${order_id}`);
		return data;
	}
</script>

<div
	class="overflow-x-auto ring  ring-slate-400 ring-opacity-40 rounded-lg shadow-xl font-semibold"
>
	<table class="table w-full">
		<!-- head -->
		<thead>
			<tr>
				<th>Numero</th>
				<th>Fecha</th>
				<th>Tipo Venta </th>
				<th>Vendedor</th>
				<th>Total Neto</th>
				<th>I.V.A</th>
				<th>Total</th>
				<th />
			</tr>
		</thead>
		<tbody class="w-full">
			<!-- row 1 -->
			{#each data as item}
				<!-- content here -->
				<tr>
					<td>{item.order_id}</td>
					<td>{dayjs(item.created_at).format('DD-MM-YYYY')}</td>
					<td class="capitalize">
						<div class="badge" class:badge-secondary={item.bussiness_id}>
							{item.bussiness_id ? 'Factura' : 'Boleta'}
						</div>
					</td>
					<td>
						{item.seller}
					</td>
					<td>
						${formato(sinIva(item.total_sale))}
					</td>
					<td>
						${formato(iva(item.total_sale))}
					</td>
					<td>
						${formato(conIva(sinIva(item.total_sale)))}
					</td>
					<td>
						<div>
							<svg
								on:click={async () => {
									!item.data ? (item.data = await getDetails(item.order_id)) : (item.data = false);
								}}
								class:-rotate-90={item.data}
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6  transition-all duration-200"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
					</td>
				</tr>
				{#if item.data}
					<tr class="w-full">
						<td colspan="8">
							<SaleDetails bind:data={item.data} />
						</td>
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
</div>
