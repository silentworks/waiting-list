<script>
	export let isOpen = false
	export let modalClose = () => {
		isOpen = !isOpen
	}
	export let modalBgClose = modalClose
</script>

{#if isOpen}
	<div id="modal" class="modal is-active">
		<div class="modal-background" on:click={modalBgClose} />
		<slot />
	</div>
{/if}
