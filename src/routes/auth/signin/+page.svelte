<script lang="ts">
	import Notification from '$lib/common/Notification.svelte'
	import { enhance } from '$app/forms'
	import { getFlash } from 'sveltekit-flash-message'
	import { page } from '$app/state'
	import type { SubmitFunction } from './$types.js'

	let isSubmitting = $state(false)

	let { form } = $props();

	const handleSubmit: SubmitFunction = () => {
		isSubmitting = true
		return async ({ update }) => {
			update()
			isSubmitting = false
		}
	}

	const flash = getFlash(page, {
		clearAfterMs: 8000
	})
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
				{#if $flash}
					<Notification showNotification={$flash.message !== undefined} status={$flash.type}>
						{$flash.message}
					</Notification>
				{/if}
				<Notification
					showNotification={form?.message !== undefined}
					status={form?.success ? 'success' : 'error'}
				>
					{form?.message}
				</Notification>
				<form method="POST" use:enhance={handleSubmit}>
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
							<button class="button is-fullwidth is-link" disabled={isSubmitting}>Login</button>
						</p>
					</div>
				</form>
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
