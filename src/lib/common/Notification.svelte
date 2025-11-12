<script lang="ts">
	interface Props {
		class?: string;
		status?: string;
		withButton?: boolean;
		showNotification?: boolean;
		children?: import('svelte').Snippet;
	}

	let {
		class: className = '',
		status = 'error',
		withButton = false,
		showNotification = false,
		children
	}: Props = $props();
	
</script>

{#if showNotification}
	<div
		class="notification {className}"
		class:is-danger={status == 'error'}
		class:is-success={status == 'success'}
	>
		{#if withButton}
			<button class="delete" onclick={() => showNotification != showNotification}></button>
		{/if}
		{@render children?.()}
	</div>
{/if}
