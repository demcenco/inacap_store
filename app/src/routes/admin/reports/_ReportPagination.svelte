<script>
	import { createEventDispatcher } from 'svelte';

	export let pagination;
	export let total_items;
	const dispatch = createEventDispatcher();
	async function changePage(page) {
		pagination.page = page;
		dispatch('changePage');
	}
</script>
<div class="flex items-center justify-center m-4 overscroll-x-none">
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
		{#if Number(total_items) - pagination.per_page * pagination.page > 0}
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
