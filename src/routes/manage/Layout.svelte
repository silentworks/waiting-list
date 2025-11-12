<script lang="ts">
	import type { CombinedUserMapper } from '$lib/data/mappers/users'
	
	interface Props {
		children?: import('svelte').Snippet;
		user?: CombinedUserMapper | null;
		pageTitle?: import('svelte').Snippet;
	}
	
	let { user, children, pageTitle }: Props = $props()
</script>

<div class="menu-label px-4 py-4 has-background-dark has-text-white is-size-6">
	{#if pageTitle}
		{@render pageTitle()}
	{:else}
		Dashboard
	{/if}
</div>
<p class="px-6 py-1 is-size-5 has-text-weight-medium">
	Welcome back {#if user}{user?.fullName}{/if}
</p>
<div class="p-6">
	{@render children?.()}
</div>
