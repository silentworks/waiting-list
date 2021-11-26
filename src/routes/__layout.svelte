<script>
	import { page, session } from '$app/stores'
	import supabase from '$lib/db'
	import { setAuthCookie, unsetAuthCookie } from '$lib/session'
	import { getProfile } from '$lib/data/queries/users/getProfile'
	import { combinedUserMapper } from '$lib/data/mappers/users'
	// import { onMount } from 'svelte'

	// onMount(() => {
	const { data: authListener } = supabase.auth.onAuthStateChange(async (event, _session) => {
		if (event === 'SIGNED_OUT') {
			session.set({ user: combinedUserMapper({}) })
			await unsetAuthCookie()
		}

		if (event === 'SIGNED_IN') {
			const profile = await getProfile()
			const user = combinedUserMapper({ ..._session.user, ...profile })
			session.set({ user })
			await setAuthCookie(_session)
		}
	})

	// 	return () => authListener?.unsubscribe()
	// })
</script>

<svelte:head>
	<title>Waiting List App</title>
</svelte:head>

<div class="site-wrapper" class:is-logged-in={$session?.user?.authenticated}>
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
