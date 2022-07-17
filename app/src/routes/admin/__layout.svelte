<script context="module">
	export async function load({ session, fetch }) {
		if (session.user.user_type == 'admin') {
			return {};
		} else {
			return {
				status: 302,
				redirect: '/seller'
			};
		}
	}
</script>

<div class="max-w-5xl mx-auto w-full">
	<slot />
</div>
