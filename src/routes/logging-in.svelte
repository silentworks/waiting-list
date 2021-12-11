<script>
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import FullScreenLoader from '$lib/common/FullScreenLoader.svelte'
	import { page } from '$app/stores'

	let redirectPath = '/account'
	onMount(async () => {
		await new Promise((r) => setTimeout(r, 2000))
		goto(redirectPath)
	})

	$: {
		if ($page.query.has('redirect')) {
			redirectPath = $page.query.get('redirect')
		}
	}
</script>

<FullScreenLoader />
