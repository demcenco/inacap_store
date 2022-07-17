<script>
	import { fade, fly } from 'svelte/transition';

	import { alert } from '$lib/stores';
</script>

{#if $alert}
	<!-- content here -->
	<div class="absolute bottom-0  p-6   right-0 " in:fly={{ y: -5, duration: 200 }} out:fade>
		<div
			class="alert  shadow-lg  "
			class:alert-warning={$alert.type == 'warning'}
			class:alert-success={$alert.type == 'success'}
			class:alert-error={$alert.type == 'error'}
		>
			<div>
				<span class=" font-semibold">{$alert.msg}</span>
			</div>
		</div>
	</div>
{/if}
