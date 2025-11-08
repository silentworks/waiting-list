<script lang="ts">
	import Header from '$lib/common/Header.svelte'
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<Header />
<main class="container is-max-desktop">
	{@render children?.()}
</main>

<style>
	.container {
		padding-top: 120px;
	}
</style>
