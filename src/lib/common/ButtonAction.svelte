<script lang="ts">
	import { enhance } from '$app/forms'

	export let action: string
	export let isDisabled = false
	export let isLoading = false
	let className = ''
	export { className as class }
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
	<slot name="inputs" />
	<button
		class="button is-success is-small {className}"
		class:is-loading={isLoading}
		disabled={isLoading || isDisabled}
	>
		<slot />
	</button>
</form>
