<script lang="ts">
	interface Props {
		class: string;
		icon?: import('svelte').Snippet;
		title?: import('svelte').Snippet;
	}

	let { class: className, icon, title }: Props = $props();
	
</script>

<button class="button has-text-weight-medium {className}">
	<span class="icon">
		{@render icon?.()}
	</span>
	<span>{@render title?.()}</span>
</button>
