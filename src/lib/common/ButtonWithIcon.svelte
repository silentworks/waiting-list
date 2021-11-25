<script>
  let className;
  export { className as class };
</script>

<button class="button has-text-weight-medium {className}">
  <span class="icon">
    <slot name="icon"></slot>
  </span>
  <span><slot name="title"></slot></span>
</button>