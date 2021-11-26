<script>
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import FullScreenLoader from '$lib/common/FullScreenLoader.svelte'

	onMount(async () => {
		await new Promise((r) => setTimeout(r, 2000))
		goto('/account')
	})
</script>

<FullScreenLoader />
