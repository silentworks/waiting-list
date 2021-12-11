<script>
	import Notification from '$lib/common/Notification.svelte'
	import { signUp } from '$lib/data/queries/users/auth'
	import { VITE_APP_URL } from '$lib/env'

	import { createForm } from 'svelte-forms-lib'
	import { SignUpSchema } from './validationSchema'

	const redirectTo = `${VITE_APP_URL}logging-in`
	let message = null
	let messageType = 'error'

	const { form, errors, handleChange, handleSubmit, isValid, isSubmitting } = createForm({
		initialValues: {
			fullName: '',
			username: '',
			email: '',
			password: ''
		},
		validate: (values) => SignUpSchema(values),
		onSubmit: async ({ fullName, username, email, password }) => {
			message = null
			const response = await signUp({ username, full_name: fullName, email, password, redirectTo })
			message = response.message
			if (response.statusCode === 200) {
				messageType = 'success'
			}
		}
	})
</script>

<Notification showNotification={message !== null} status={messageType}>{message}</Notification>

<form on:submit|preventDefault={handleSubmit}>
	<div class="field">
		<p class="control">
			<input bind:value={$form.fullName} class="input" type="text" placeholder="Full Name" />
		</p>
		{#if $errors.fullName}
			<p class="help is-danger">{$errors.fullName}</p>
		{/if}
	</div>
	<div class="field">
		<p class="control">
			<input bind:value={$form.username} class="input" type="text" placeholder="Username" />
		</p>
		{#if $errors.username}
			<p class="help is-danger">{$errors.username}</p>
		{/if}
	</div>
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
			<button class="button is-fullwidth is-link"> Sign up </button>
		</p>
	</div>
</form>
