<script>
  import Modal from "./Modal.svelte";

  export let isSmall = false;
  export let isOpen = false;
  export let modalClose = () => { isOpen = !isOpen };
</script>

<Modal {isOpen} {modalClose}>
  <div class="modal-card has-background-white" class:is-small={isSmall}>
    <header class="modal-card-head">
      <button class="delete mr-2" aria-label="close" on:click={modalClose}></button>
      <p class="modal-card-title has-text-centered title is-6 mb-0"><slot name="modal-title"></slot></p>
      <button class="button is-ghost is-small">Next</button>
    </header>
    <section class="modal-card-body p-0">
      <slot />
    </section>
  </div>
</Modal>