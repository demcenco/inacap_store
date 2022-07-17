<script context="module">
	export async function load({ session }) {

		if (session.user) {
			if (session.user.user_type == 'seller') {
				return {
					status: 302,
					redirect: '/seller'
				};
			}
			if (session.user.user_type == 'admin') {
				return {
					status: 302,
					redirect: '/admin'
				};
			}
		}
		return {};
	}
</script>

<script>
	import '../app.css';
	import NavBar from '$lib/components/_Navbar.svelte';
	import Alert from '$lib/components/_Alert.svelte';
</script>

<div class="flex flex-col h-screen bg-base-100">
	<NavBar />
	<div class="flex flex-col flex-auto bg-base-300 p-2 md:p-6">
		<slot />
	</div>
	<Alert />
</div>
