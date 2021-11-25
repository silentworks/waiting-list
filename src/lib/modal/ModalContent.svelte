<script>
	import Modal from './Modal.svelte'

	export let isOpen = false
	export let isWide = true
	export let hideClose = false
	export let modalClose = () => {
		isOpen = !isOpen
	}
	export let modalBgClose = modalClose
</script>

<Modal {isOpen} {modalClose} {modalBgClose}>
	<article class="modal-content has-background-white" class:is-wide={isWide}>
		<slot />
	</article>
	{#if !hideClose}
		<button class="modal-close is-large" on:click={modalClose}>close</button>
	{/if}
</Modal>
