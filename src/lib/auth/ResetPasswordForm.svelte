<script>
	import { createEventDispatcher } from 'svelte'
	import { createForm } from 'svelte-forms-lib'
	import { ResetPasswordSchema } from './validationSchema'
	import { updatePassword } from '$lib/data/queries/users/auth'
	import Notification from '$lib/common/Notification.svelte'

	const dispatch = createEventDispatcher()
	let message = null
	let messageType = 'error'

	const { form, errors, handleChange, handleSubmit, isValid, isSubmitting } = createForm({
		initialValues: {
			password: '',
			passwordConfirm: ''
		},
		validate: (values) => ResetPasswordSchema(values),
		onSubmit: async ({ password }) => {
			message = null
			const response = await updatePassword({ password })
			message = response.message
			if (response.statusCode === 200) {
				messageType = 'success'
				dispatch('formSuccess', { response })
			}
		}
	})
</script>

<Notification showNotification={message !== null} status={messageType}>{message}</Notification>

<form on:submit|preventDefault={handleSubmit}>
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
			<input
				bind:value={$form.passwordConfirm}
				class="input"
				type="password"
				placeholder="Confirm Password"
			/>
		</p>
		{#if $errors.passwordConfirm}
			<p class="help is-danger">{$errors.passwordConfirm}</p>
		{/if}
	</div>
	<div class="field">
		<p class="control">
			<button class="button is-fullwidth is-link">Update Password</button>
		</p>
	</div>
</form>
