<script>
	import Notification from '$lib/common/Notification.svelte'
	import { enhance } from '$app/forms'

	export let form
</script>

<svelte:head>
	<title>WLA</title>
</svelte:head>

<p class="py-1 is-size-5 has-text-weight-slim mb-4">Update Password</p>

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
					name="password"
					value={form?.password ?? ''}
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
				<input
					name="passwordConfirm"
					value={form?.passwordConfirm ?? ''}
					class="input"
					type="password"
					placeholder="Confirm Password"
				/>
			</p>
			{#if form?.errors?.passwordConfirm}
				<p class="help is-danger">{form?.errors?.passwordConfirm}</p>
			{/if}
		</div>
		<div class="field">
			<p class="control">
				<button class="button is-fullwidth is-link">Update Password</button>
			</p>
		</div>
	</form>
</div>
