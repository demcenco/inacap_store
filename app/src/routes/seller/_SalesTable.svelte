<script>
	import { get } from '$lib/api';
	import { goto } from '$app/navigation';

	import dayjs from 'dayjs';
	export let data;
	export let pagination;

	let total_items = data.total;

	async function changePage(page) {
		pagination.page = page;
		let search = new URLSearchParams(pagination).toString();
		let res = await get(`seller/sale?${search}`);
		data = res;
		total_items = res.total;
	}
</script>

<div
	class=" flex flex-col  items-center justify-center mt-4 w-full ring-[2px] rounded-lg  ring-slate-400 ring-opacity-60  overflow-hidden"
>
	<div class="w-full max-w-5xl  overflow-x-auto pb-2 md:pb-0 ">
		<table class="table table-zebra table-compact w-full  overflow-x-auto ">
			<thead>
				<tr>
					<th>#</th>
					<th>Fecha Creacion</th>
					<th>Turno</th>
					<th>Estado</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{#each data.orders as item}
					<!-- content here -->
					<tr>
						<td>{item.order_id}</td>
						<td> {dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
						<td>{item.shift_id}</td>
						<td>
							<div
								class="badge "
								class:badge-primary={item.completed}
								class:badge-accent={!item.completed}
							>
								{item.completed ? 'Cerrada' : 'Abierta'}
							</div></td
						>
						<td>
							<button
								on:click={() => goto(`/seller/sale/${item.order_id}`)}
								class="btn btn-xs btn-secondary"
							>
								Ver
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	{#if pagination.page >= 1}
		<!-- content here -->

		<div class="flex items-center justify-center m-2">
			<div class="btn-group">
				{#if pagination.page > 1}
					<button
						class="btn btn-sm"
						on:click={() => {
							changePage(Number(pagination.page) - 1);
						}}>«</button
					>
					<button
						class="btn btn-sm"
						on:click={() => {
							changePage(Number(pagination.page) - 1);
						}}
					>
						{Number(pagination.page) - 1}</button
					>
				{/if}

				<button class="btn btn-sm btn-active"> {pagination.page}</button>
				{#if total_items - pagination.per_page * pagination.page > 0}
					<!-- content here -->
					<button
						class="btn btn-sm"
						on:click={() => {
							changePage(Number(pagination.page) + 1);
						}}
					>
						{Number(pagination.page) + 1}</button
					>
					<button
						class="btn btn-sm"
						on:click={() => {
							changePage(Number(pagination.page) + 1);
						}}>»</button
					>
				{/if}
			</div>
		</div>
	{/if}
</div>
