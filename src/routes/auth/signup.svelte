<script>
	import SignUpForm from '$lib/auth/SignUpForm.svelte'
	import GitHubButton from '$lib/common/GitHubButton.svelte'
	import TwitterButton from '$lib/common/TwitterButton.svelte'
</script>

<svelte:head>
	<title>Sign up - Supagram</title>
</svelte:head>

<section class="columns mt-2">
	<div class="column is-two-fifths-desktop is-offset-4-desktop">
		<div class="box p-6">
			<h2 class="subtitle is-3 has-text-centered pb-4">Supagram</h2>
			<div class="buttons is-justify-content-center">
				<GitHubButton />
				<TwitterButton />
			</div>
			<p class="has-text-centered pb-4">or</p>
			<div class="content">
				<SignUpForm />
			</div>
		</div>

		<div class="box">
			<p class="has-text-centered">Have have an account? <a href="/auth/signin">Sign in</a></p>
		</div>
	</div>
</section>
