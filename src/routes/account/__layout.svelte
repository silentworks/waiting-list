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

<section class="columns mt-6 pt-6">
	<Header />
	<slot />
</section>
