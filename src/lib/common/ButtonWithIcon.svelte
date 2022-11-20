<script lang="ts">
	let className: string
	export { className as class }
</script>

<button class="button has-text-weight-medium {className}">
	<span class="icon">
		<slot name="icon" />
	</span>
	<span><slot name="title" /></span>
</button>
