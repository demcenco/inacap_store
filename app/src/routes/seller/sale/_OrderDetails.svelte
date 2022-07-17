<script>
	import { session } from '$app/stores';
	import dayjs from 'dayjs';
	export let order;
</script>

<div class="flex justify-between">
	<div class="flex flex-col w-full  md:w-72 ">
		<div class="flex  text-3xl justify-between font-semibold">
			<div>BOLETA</div>
			<span class="text-slate-800">#{$session.user.user_id}-{order.order_id}</span>
		</div>
		<div class="flex items-center text-sm  justify-between mt-2 font-semibold">
			<div>FECHA INICIO</div>
			<div>
				{dayjs(order.created_at).format('YYYY-MM-DD HH:mm:ss')}
			</div>
		</div>
		<div class="flex items-center text-sm    justify-between font-semibold ">
			<div>FECHA PAGO</div>
			<div>
				{order.completed ? dayjs(order.updated_at).format('YYYY-MM-DD HH:mm:ss') : 'PENDIENTE'}
			</div>
		</div>
		<div class="flex items-center text-sm     justify-between font-semibold ">
			<div>ESTADO</div>
			<div class={order.completed ? 'text-teal-500' : 'text-yellow-500'}>
				{order.completed ? 'COMPLETADO' : 'PENDIENTE'}
			</div>
		</div>
	</div>
	<div class="hidden md:block bg-slate-200  rounded-full p-6">
		<img src="/store.svg" class="" width="80" alt="" />
	</div>
</div>
