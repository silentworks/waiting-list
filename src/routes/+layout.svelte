<script>
	import { supabaseClient } from '$lib/db'
	import { page } from '$app/stores'
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth')
		})

		return () => {
			subscription.unsubscribe()
		}
	})
</script>

<svelte:head>
	<title>Waiting List App</title>
</svelte:head>

<div class="site-wrapper" class:is-logged-in={$page.data.session?.user?.id}>
	<main class="columns is-gapless is-fullheight">
		<slot />
	</main>
</div>

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
