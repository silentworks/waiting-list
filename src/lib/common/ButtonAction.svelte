<script lang="ts">
	import { enhance } from '$app/forms'

	interface Props {
		action: string;
		isDisabled?: boolean;
		isLoading?: boolean;
		class?: string;
		inputs?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
	}

	let {
		action,
		isDisabled = false,
		isLoading = $bindable(false),
		class: className = '',
		inputs,
		children
	}: Props = $props();
	
</script>

<form
	method="POST"
	{action}
	use:enhance={() => {
		isLoading = true
		return async ({ update }) => {
			isLoading = false
			update()
		}
	}}
>
	{@render inputs?.()}
	<button
		class="button is-success is-small {className}"
		class:is-loading={isLoading}
		disabled={isLoading || isDisabled}
	>
		{@render children?.()}
	</button>
</form>
