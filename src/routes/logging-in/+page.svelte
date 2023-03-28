<script lang="ts">
	import { goto } from '$app/navigation'
	import FullScreenLoader from '$lib/common/FullScreenLoader.svelte'
	import { page } from '$app/stores'
	import { browser } from '$app/environment'

	export let data
	$: {
		// check if user has been set in session store then redirect
		if (browser && data.session) {
			goto($page.url.searchParams.get('next') ?? '/account')
		}
	}
</script>

<FullScreenLoader />
