<script context="module">
	import { withPageAuth } from '@supabase/auth-helpers-sveltekit'

	export const load = async ({ session }) =>
		withPageAuth(
			{
				redirectTo: '/auth/signin',
				user: session.user
			},
			() => {
				if (session.user?.isAdmin) {
					return {
						status: 307,
						redirect: `/manage`
					}
				}

				return {}
			}
		)
</script>

<script>
	import Header from '$lib/common/Header.svelte'
</script>

<Header />
<main class="container is-max-desktop">
	<slot />
</main>

<style>
	.container {
		padding-top: 120px;
	}
</style>
