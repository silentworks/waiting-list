<script>
	import ForgotPasswordForm from '$lib/auth/ForgotPasswordForm.svelte'
</script>

<svelte:head>
	<title>Forgot your password? - Waiting List App</title>
</svelte:head>

<section class="columns mt-2">
	<div class="column is-two-fifths-desktop is-offset-4-desktop">
		<div class="box p-6">
			<h2 class="subtitle is-3 has-text-centered pb-4">Waiting List App</h2>
			<div class="content">
				<h2 class="title is-5 has-text-centered">Trouble logging in?</h2>
				<p class="has-text-centered">
					Enter your email and we'll send you a link to get back into your account.
				</p>
				<ForgotPasswordForm />
			</div>
		</div>

		<div class="box">
			<p class="has-text-centered"><a href="/auth/signin">Back to Login</a></p>
		</div>
	</div>
</section>
