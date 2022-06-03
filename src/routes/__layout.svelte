<script>
	import { goto } from '$app/navigation'
	import { session } from '$app/stores'
	import supabase from '$lib/db'
	import { SupaAuthHelper } from '@supabase/auth-helpers-svelte'

	const onUserUpdate = async (user) => {
		if (user) {
			console.log('I am here and about to redirect', { user })
			await goto('/logging-in')
		}
	}

	// supabase.auth.onAuthStateChange(async (event, _session) => {
	// 	if (event === 'SIGNED_OUT') {
	// 		session.set({ user: combinedUserMapper({}) })
	// 	}

	// 	if (event === 'SIGNED_IN') {
	// 		const sessionUser = _session.user
	// 		const profile = await getProfileById(sessionUser?.id)
	// 		const user = combinedUserMapper({ ...sessionUser, ...profile })
	// 		session.set({ user })
	// 	}
	// })
</script>

<svelte:head>
	<title>Waiting List App</title>
</svelte:head>
<SupaAuthHelper supabaseClient={supabase} {onUserUpdate} {session}>
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
