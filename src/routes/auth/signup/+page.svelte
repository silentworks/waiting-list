<script lang="ts">
	import { enhance } from '$app/forms'
	import Notification from '$lib/common/Notification.svelte'

	let { form } = $props();
</script>

<svelte:head>
	<title>Waiting List App - Sign up</title>
</svelte:head>

<section class="columns mt-2">
	<div class="column is-two-fifths-desktop is-offset-4-desktop">
		<div class="box p-6">
			<h2 class="subtitle is-3 has-text-centered pb-4">Waiting List App</h2>
			<div class="content">
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
								name="fullName"
								value={form?.fullName ?? ''}
								class="input"
								type="text"
								placeholder="Full Name"
							/>
						</p>
						{#if form?.errors?.fullName}
							<p class="help is-danger">{form?.errors?.fullName}</p>
						{/if}
					</div>
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
							<input
								name="password"
								value=""
								class="input"
								type="password"
								placeholder="Password"
							/>
						</p>
						{#if form?.errors?.password}
							<p class="help is-danger">{form?.errors?.password}</p>
						{/if}
					</div>
					<div class="field">
						<p class="control">
							<button class="button is-fullwidth is-link">Sign up</button>
						</p>
					</div>
				</form>
			</div>
		</div>

		<div class="box">
			<p class="has-text-centered">Have have an account? <a href="/auth/signin">Sign in</a></p>
		</div>
	</div>
</section>
