<script>
	import { createForm } from 'svelte-forms-lib'
	import { ForgotPasswordSchema } from './validationSchema'

	import { VITE_APP_URL } from '$lib/env'
	import { triggerResetPasswordEmail } from '$lib/data/queries/users/auth'
	import Notification from '$lib/common/Notification.svelte'

	const redirectTo = `${VITE_APP_URL}`
	let message = null
	let messageType = 'error'

	const { form, errors, handleChange, handleSubmit, handleReset, isValid, isSubmitting } =
		createForm({
			initialValues: {
				email: ''
			},
			validate: (values) => ForgotPasswordSchema(values),
			onSubmit: ({ email }) => {
				message = null
				const response = triggerResetPasswordEmail({ email, redirectTo })
				message = response.message
				if (response.statusCode === 200) {
					messageType = 'success'
					handleReset()
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
			<button class="button is-fullwidth is-link"> Send password reset link </button>
		</p>
	</div>
</form>
