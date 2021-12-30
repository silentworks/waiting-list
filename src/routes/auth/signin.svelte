<script>
	import SignInForm from '$lib/auth/SignInForm.svelte'
	import GitHubButton from '$lib/common/GitHubButton.svelte'
	import TwitterButton from '$lib/common/TwitterButton.svelte'
</script>

<svelte:head>
	<title>Waiting List App - Sign In</title>
</svelte:head>

<section class="columns mt-6 pt-6">
	<div class="column is-half is-hidden-touch">
		<figure class="image">
			<img src="/img/WaitingList_Placeholder.png" alt="Placeholder" />
		</figure>
	</div>
	<div class="column is-two-fifths-desktop is-half-tablet-only">
		<div class="box p-6">
			<h2 class="subtitle is-3 has-text-centered pb-4">Waiting List App</h2>
			<div class="content">
				<SignInForm />
			</div>
			<div class="buttons is-justify-content-center">
				<a href="/auth/forgotpassword" class="button is-ghost is-size-6">
					<span>Forgot password?</span>
				</a>
			</div>
		</div>

		<div class="box">
			<p class="has-text-centered">
				Don't have an account? <a href="/">Get on the waiting list</a>
			</p>
		</div>
	</div>
</section>
