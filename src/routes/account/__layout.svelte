<script context="module">
	import { checkIfLoggedIn } from '$lib/session'

	export const load = async ({ session }) => {
		if (session?.user?.isAdmin) {
			return {
				status: 307,
				redirect: `/manage`
			}
		}

		return checkIfLoggedIn({ session })
	}
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
