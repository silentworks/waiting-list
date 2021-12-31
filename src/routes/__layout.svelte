<script>
	import { session } from '$app/stores'
	import supabase from '$lib/db'
	import { setAuthCookie, unsetAuthCookie } from '$lib/session'
	import { getProfileById } from '$lib/data/queries/users/getProfile'
	import { combinedUserMapper } from '$lib/data/mappers/users'

	supabase.auth.onAuthStateChange(async (event, _session) => {
		if (event === 'SIGNED_OUT') {
			session.set({ user: combinedUserMapper({}) })
			await unsetAuthCookie()
		}

		if (event === 'SIGNED_IN') {
			const sessionUser = _session.user
			const profile = await getProfileById(sessionUser?.id)
			const user = combinedUserMapper({ ...sessionUser, ...profile })
			session.set({ user })
			await setAuthCookie(_session)
		}
	})
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
