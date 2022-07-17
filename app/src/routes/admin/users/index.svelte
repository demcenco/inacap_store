<script context="module">
	export async function load({ fetch }) {
		let res = await fetch('/api/admin/users');
		let { users } = await res.json();

		return { props: { users } };
	}
</script>

<script>
	import { put } from '$lib/api';

	export let users;

	async function updateUser(user, type, index) {
		if (type == 'activar') {
			user.active = !user.active;
		}
		if (type == 'rol') {
			user.user_type = user.user_type == 1 ? 2 : 1;
		}
		await put('admin/users', user);
		users.splice(index, 1, user);
		users = [...users];
	}
</script>

<div
	class="overflow-x-auto shadow-xl ring rounded-lg ring-slate-400 ring-opacity-50 font-semibold max-w-6xl m-auto"
>
	<table class="table table-compact  w-full">
		<!-- head -->
		<thead>
			<tr>
				<th>Nombre</th>
				<th>RUT</th>
				<th>Correo</th>
				<th>Rol</th>
				<th>Estado</th>
				<th>Acciones</th>
			</tr>
		</thead>
		<tbody>
			{#each users as user, index}
				<tr>
					<td>{user.name} {user.last_name}</td>
					<td>{user.rut}</td>
					<td>
						<span class="truncate">
							{user.email}
						</span>
					</td>
					<td>{user.user_type == 'admin' ? 'Administrador' : 'Vendedor'}</td>
					<td>{user.active == true ? 'Activo' : 'Inactivo'}</td>
					<td>
						<button on:click={() => updateUser(user, 'activar', index)} class="btn btn-sm">
							{user.active == true ? 'Desactivar' : 'Activar'}
						</button>
						<button on:click={() => updateUser(user, 'rol', index)} class="btn btn-sm">
							Cambiar Rol
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
