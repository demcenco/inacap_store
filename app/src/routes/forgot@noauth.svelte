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
			alert = 'Se ha enviado un correo de recuperacion';
			setTimeout(() => {
				alert = false;
			}, 2000);
		} else {
			alert = isValid.message;
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

<div class="max-w-2xl flex flex-col bg-base-100 p-12 m-auto gap-4">
	<div>
		{alert}
	</div>
	<input class="input input-bordered" type="text" bind:value={correo} />
	<button on:click={enviarAlerta} class="btn"> Enviar </button>
</div>
