<script>
	import SignUpForm from '$lib/auth/SignUpForm.svelte'
</script>

<svelte:head>
	<title>Waiting List App - Sign up</title>
</svelte:head>

<section class="columns mt-2">
	<div class="column is-two-fifths-desktop is-offset-4-desktop">
		<div class="box p-6">
			<h2 class="subtitle is-3 has-text-centered pb-4">Waiting List App</h2>
			<div class="content">
				<SignUpForm />
			</div>
		</div>

		<div class="box">
			<p class="has-text-centered">Have have an account? <a href="/auth/signin">Sign in</a></p>
		</div>
	</div>
</section>
