<script>
	export let bgColor = '#3ecf8e'
</script>

<div class="inline-loader" style="background-color: {bgColor}">
	<div class="loader" />
</div>

<style>
	.inline-loader {
		position: absolute;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		z-index: 50;
		display: grid;
		place-items: center;
	}
	.loader {
		position: relative;
		width: 4rem;
		height: 4rem;
	}
	.loader::before,
	.loader::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		transform: translate(-50%, -50%) scale(0);
	}
	.loader::before {
		background: #fff;
		animation: pulse2 2s ease-in-out infinite;
	}
	.loader::after {
		background: #fff;
		animation: pulse2 2s 1s ease-in-out infinite;
	}

	@-webkit-keyframes pulse2 {
		0%,
		100% {
			transform: translate(-50%, -50%) scale(0);
			opacity: 1;
		}
		50% {
			transform: translate(-50%, -50%) scale(1);
			opacity: 0;
		}
	}
	@keyframes pulse2 {
		0%,
		100% {
			transform: translate(-50%, -50%) scale(0);
			opacity: 1;
		}
		50% {
			transform: translate(-50%, -50%) scale(1);
			opacity: 0;
		}
	}
</style>
