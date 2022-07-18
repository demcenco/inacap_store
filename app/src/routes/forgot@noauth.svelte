<script>
	import * as yup from 'yup';
	let correo = 'prueba@mail.cl';
	let alert = false;

	const schema = yup.object().shape({
		correo: yup.string().email('Debe ingresar un mail valido').required('Debe ingresar su correo')
	});
	async function enviarAlerta() {
		let isValid = await validarCorreo();
		if (isValid.success) {
			alert = { message: 'Se ha enviado un correo de recuperacion', success: true };
			setTimeout(() => {
				alert = false;
			}, 2000);
		} else {
			alert = { message: isValid.message, success: false };
		}
	}
	async function validarCorreo() {
		try {
			await schema.validate({ correo });
			return { success: true };
		} catch (error) {
			return { success: false, message: error.message };
		}
	}
</script>

<div class="flex flex-col flex-auto items-center justify-center w-full max-w-md m-auto gap-4">
	{#if alert}
		<div class:bg-primary={alert.success} class:bg-warning={!alert.success} class="alert shadow-lg">
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="stroke-current flex-shrink-0 h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				<span>{alert.message}</span>
			</div>
		</div>
	{/if}
	<div class="flex flex-col py-8 px-14 space-y-4 bg-base-100 rounded-xl   w-full">
		<div>
			<div class="text-3xl font-bold">Recuperar</div>
			<span class="text-sm">
				<div class="form-control w-full ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span class="label-text font-semibold">Ingrese Correo</span>
					</label>
					<input bind:value={correo} type="text" class="input input-bordered w-full" />
				</div>
			</span>
			<span class="font-semibold text-sm">Enviaremos un Codigo de recuperacion</span>
		</div>
		<button on:click={enviarAlerta} class="btn btn-primary w-full">Enviar</button>
	</div>
</div>
