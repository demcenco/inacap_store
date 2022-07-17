<script context="module">
	export async function load({ session, fetch }) {
		if (!session.user) {
			return {
				status: 302,
				redirect: '/login'
			};
		}
		return {};
	}
</script>

<script>
	import { session } from '$app/stores';

	import NavBar from '$lib/components/_Navbar.svelte';
	import { userFullName, userCode } from '$lib/stores';
	import '../app.css';
	import Alert from '../lib/components/_Alert.svelte';
</script>

<div class=" h-screen">
	<div class="flex flex-col h-full">
		<NavBar />

		<div class="flex flex-col flex-auto p-2 md:p-8 bg-base-200">
			{#if $session?.user?.user_type == 2}
				<!-- content here -->
				<div class="flex item-center justify-center mb-4">
					<div class=" text-yellow-500 text-lg">
						Vendedor: {$userFullName} -- Codigo Vendedor: {$userCode}
					</div>
				</div>
			{/if}
			{#if $session?.user}
				<slot />
			{/if}
		</div>
	</div>
	<Alert />
</div>
