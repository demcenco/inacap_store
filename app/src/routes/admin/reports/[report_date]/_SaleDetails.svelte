<script>
	export let data;

	const { products, bussiness } = data[0];

</script>

<div class="grid gap-2 w-full">
	<div class="flex  h-full gap-2">
		<div class="flex flex-col w-full">
			<div class="text-center  font-semibold">Productos</div>
			<div class="flex gap-4   w-full border-b border-slate-700 pb-1 text-sm">
				<div class="w-full">Codigo</div>
				<div class="w-full">Nombre</div>
				<div class="w-full">Cantidad</div>
				<div class="w-full">Precio</div>
				<div class="w-full">Total</div>
			</div>
			{#each products as item}
				<div class="grid grid-cols-5 gap-4   w-full border-b border-opacity-10 border-slate-700 pb-1 text-sm">
					<div class="w-full">
						{item.product_id}
					</div>
					<div class="w-full truncate" >
						{item.name}
					</div>
					<div class="w-full">
						{item.amount}
					</div>
					<div class="w-full ">
						{item.price}
					</div>
					<div class="w-full">
						{item.price * item.amount}
					</div>
				</div>

				<!-- content here -->
			{/each}
		</div>
		{#if bussiness}
			<div class="w-full">
				<div class="flex flex-col border border-slate-500 p-4 rounded">
					<div class="text-sm font-semibold text-center">Datos empresa</div>
					<div class="flex flex-col mt-2">
						<div class="flex  font-bold text-sm">
							<div class="w-1/3 mr-2">RUT:</div>
							<div class="w-full">
								{bussiness.rut}
							</div>
						</div>
						<div class="flex  font-bold text-sm">
							<div class="w-1/3 mr-2">NOMBRE:</div>
							<div class="w-full">
								{bussiness.name}
							</div>
						</div>
						<div class="flex  font-bold text-sm">
							<div class="w-1/3 mr-2">GIRO:</div>
							<div class="w-full">
								{bussiness.type}
							</div>
						</div>
						<div class="flex  font-bold text-sm">
							<div class="w-1/3 mr-2">DIRECCION:</div>
							<div class="w-full">
								{bussiness.address}
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- content here -->
		{/if}
	</div>
</div>
