<script>
	export let order;
	import { formato, sinIva, conIva, iva } from '$lib/utils';


	const {
		sale: [sale]
	} = order;

	$: totalPago = order.products.reduce((a, item) => {
		a += item.price * item.amount;
		return a;
	}, 0);
	async function getPdf() {
		var source = document.getElementById('factura').outerHTML;

		html2pdf(source, {
			filename: 'factura.pdf',
			image: { type: 'jpeg', quality: 1 },
			html2canvas: { scale: 2 },
			jsPDF: { unit: 'mm', format: 'A4', orientation: 'portrait', putOnlyUsedFonts: true }
		}).then(function () {
			source.classList.remove('print');
		});
	}
</script>

<svelte:head>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
		integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"></script>
</svelte:head>
<div class="mx-auto dontPrint">
	<button on:click={() => window.print()} class="btn btn-primary gap-2">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
			/>
		</svg> Imprimir
	</button>
	<button on:click={() => getPdf()} class="btn btn-primary gap-2">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
			/>
		</svg> Descargar
	</button>
</div>

<div id="factura" class="px-2 py-4  mx-auto  w-full   max-w-4xl ">
	<div class="flex flex-col gap-4  p-8 rounded-2xl bg-base-100">
		<div class="flex justify-between">
			<div class="text-xl  font-bold">Bazar TiaNona</div>
			<div class="flex flex-col text-sm">
				<div>Boleta: #323</div>
				<div>Fecha: 12-12-2022</div>
			</div>
		</div>
		<div class="flex flex-col text-sm">
			<div>Av. Concha y Toro 2730, Puente Alto,</div>
			<div>Region Metropolitana</div>
			<div>Santiago</div>
			(2) 2816 2300
		</div>
		<div class=" flex flex-col justify-start  text-sm m-auto p-2 border border-slate-500  ">
			<div class="text-center uppercase font-bold text-sm">Datos Cliente</div>
			<div>
				<div>
					<div>RUT: {sale.rut}</div>
					<div>NOMBRE: {sale.name}</div>
					<div>GIRO: {sale.type}</div>
					<div>DIRECCION: {sale.address}</div>
				</div>
			</div>
		</div>
		<div class="overflow-x-auto">
			<table class="table table-compact w-full">
				<thead>
					<tr>
						<th> Forma de pago </th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Efectivo / Tarjeta</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="overflow-x-auto">
			<table class="table table-compact w-full">
				<thead>
					<tr>
						<th> Codigo</th>
						<th> Descripcion</th>
						<th> Cantidad</th>
						<th> Valor</th>
						<th> Total</th>
					</tr>
				</thead>
				<tbody>
					{#each order.products as item}
						<tr>
							<td> {item.product_id} </td>
							<td> {item.name} </td>
							<td> {item.amount} </td>
							<td>$ {formato(sinIva(item.price))} </td>
							<td>$ {formato(sinIva(item.price * item.amount))} </td>
						</tr>
					{/each}
				</tbody>
			</table>
			<div class="grid  sm:grid-cols-4 my-4 ">
				<div class=" sm:col-start-4 w-full ">
					<div class="font-semibold grid grid-cols-2 gap-4  border-b border-slate-500">
						<div class=" text-left">NETO</div>
						<div>
							$ {formato(sinIva(totalPago))}
						</div>
					</div>
					<div class="font-semibold grid grid-cols-2 gap-4 border-b border-slate-500">
						<div class=" text-left">I.V.A. 19%</div>
						<div>
							$ {formato(iva(totalPago))}
						</div>
					</div>
					<div class="font-semibold grid grid-cols-2 gap-4">
						<div class=" text-left">TOTAL</div>
						<div>
							$ {formato(conIva(sinIva(totalPago)))}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
