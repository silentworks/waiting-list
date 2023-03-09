<script lang="ts">
	import { goto } from '$app/navigation'
	import FullScreenLoader from '$lib/common/FullScreenLoader.svelte'
	import { page } from '$app/stores'
	import type { PageData } from './$types'
	import { browser } from '$app/environment'

	export let data: PageData
	$: {
		const redirectTo = $page.url.searchParams.get('redirect')

		// check if user has been set in session store then redirect
		if (browser && data.session) {
			goto(redirectTo ?? '/account')
		}
	}
</script>

<FullScreenLoader />
