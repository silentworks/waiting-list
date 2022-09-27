<script>
	import { onMount } from 'svelte'
	import ResetPasswordForm from '$lib/auth/ResetPasswordForm.svelte'
	import { parsedParams } from '$lib/utils'

	let token
	onMount(() => {
		const params = parsedParams(window.location.hash)
		token = params.access_token
	})
</script>

<svelte:head>
	<title>Reset your password - Waiting List App</title>
</svelte:head>

<section class="columns mt-2">
	<div class="column is-two-fifths-desktop is-offset-4-desktop">
		<div class="box p-6">
			<h2 class="subtitle is-3 has-text-centered pb-4">Supagram</h2>
			<div class="content">
				<h2 class="title is-5 has-text-centered">Reset your password</h2>
				<p class="has-text-centered">Enter your new password.</p>
				<ResetPasswordForm {token} />
			</div>
			<p class="has-text-centered pb-4">or</p>
			<div class="buttons is-justify-content-center">
				<a href="/auth/signup" class="button is-ghost is-size-6 has-text-weight-semibold">
					<span>Create New Account</span>
				</a>
			</div>
		</div>

		<div class="box">
			<p class="has-text-centered"><a href="/auth/signin">Back to Login</a></p>
		</div>
	</div>
</section>
