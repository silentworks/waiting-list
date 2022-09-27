<script>
	import { session } from '$app/stores'
	import supabase from '$lib/db'
	import { SupaAuthHelper } from '@supabase/auth-helpers-svelte'
</script>

<svelte:head>
	<title>Waiting List App</title>
</svelte:head>
<SupaAuthHelper supabaseClient={supabase} {session}>
	<div class="site-wrapper" class:is-logged-in={$session?.user?.id}>
		<main class="columns is-gapless is-fullheight">
			<slot />
		</main>
	</div>
</SupaAuthHelper>

<style>
	:global(body, html, #svelte) {
		height: 100%;
	}
	.site-wrapper {
		height: 100%;
		max-height: 100%;
	}
	:global(.is-borderless) {
		border: none !important;
	}
	:global(.is-fullheight) {
		min-height: 100vh;
	}
</style>
