<script lang="ts">
	import { enhance } from '$app/forms'
	import Notification from '$lib/common/Notification.svelte'

	export let form
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
				<Notification
					showNotification={form?.message !== undefined}
					status={form?.success ? 'success' : 'error'}
				>
					{form?.message}
				</Notification>
				<form method="POST" use:enhance>
					<div class="field">
						<p class="control">
							<input
								name="email"
								value={form?.email ?? ''}
								class="input"
								type="email"
								placeholder="Email"
							/>
						</p>
						{#if form?.errors?.email}
							<p class="help is-danger">{form?.errors?.email}</p>
						{/if}
					</div>
					<div class="field">
						<p class="control">
							<button class="button is-fullwidth is-link">Send password reset link</button>
						</p>
					</div>
				</form>
			</div>
		</div>

		<div class="box">
			<p class="has-text-centered"><a href="/auth/signin">Back to Login</a></p>
		</div>
	</div>
</section>
