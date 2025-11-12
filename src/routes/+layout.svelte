<script lang="ts">
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'

	let { data, children } = $props();

	let { session, supabase } = $derived(data)

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => data.subscription.unsubscribe()
	})
</script>

<svelte:head>
	<title>Waiting List App</title>
</svelte:head>

<div class="site-wrapper" class:is-logged-in={session?.user?.id}>
	<main class="columns is-gapless is-fullheight">
		{@render children?.()}
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
