<script>
	let className = ''
	export let status = 'error'
	export let withButton = false
	export let showNotification = false
	export { className as class }
</script>

{#if showNotification}
	<div
		class="notification {className}"
		class:is-danger={status == 'error'}
		class:is-success={status == 'success'}
	>
		{#if withButton}
			<button class="delete" on:click={() => showNotification != showNotification} />
		{/if}
		<slot />
	</div>
{/if}
