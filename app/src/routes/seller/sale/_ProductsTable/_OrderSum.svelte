<script>
	import { formato } from '$lib/utils';

	export let order;
	$: sum_total = order.products.reduce((accumulator, item) => {
		return accumulator + item.amount * item.price;
	}, 0);
</script>

<div class="p-2 font-semibold">
	<div class="flex justify-between">
		<div>TOTAL</div>
		<div>$ {formato(sum_total)}</div>
	</div>
</div>
