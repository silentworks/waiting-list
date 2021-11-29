<script>
	import { goto } from '$app/navigation'
	import { signIn } from '$lib/data/queries/users/auth'
	import { createForm } from 'svelte-forms-lib'
	import { SignInSchema } from './validationSchema'
	import Notification from '$lib/common/Notification.svelte'

	let message = null
	let messageType = 'error'

	const { form, errors, handleSubmit, isSubmitting } = createForm({
		initialValues: {
			email: '',
			password: ''
		},
		validate: (values) => SignInSchema(values),
		onSubmit: async ({ email, password }) => {
			message = null
			const response = await signIn({ email, password })
			message = response.message
			if (response.statusCode === 200) {
				messageType = 'success'
				goto('/logging-in')
			}
		}
	})
</script>

<Notification showNotification={message !== null} status={messageType}>{message}</Notification>

<form on:submit|preventDefault={handleSubmit}>
	<div class="field">
		<p class="control">
			<input bind:value={$form.email} class="input" type="email" placeholder="Email" />
		</p>
		{#if $errors.email}
			<p class="help is-danger">{$errors.email}</p>
		{/if}
	</div>
	<div class="field">
		<p class="control">
			<input bind:value={$form.password} class="input" type="password" placeholder="Password" />
		</p>
		{#if $errors.password}
			<p class="help is-danger">{$errors.password}</p>
		{/if}
	</div>
	<div class="field">
		<p class="control">
			<button class="button is-fullwidth is-link" disabled={$isSubmitting}>Login</button>
		</p>
	</div>
</form>
