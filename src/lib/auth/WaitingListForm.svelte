<script>
	import Notification from '$lib/common/Notification.svelte'
	import { addToWaitingList } from '$lib/data/queries/waiting_list'

	import { createForm } from 'svelte-forms-lib'
	import { WaitingListSchema } from './validationSchema'

	let message = null
	let messageType = 'error'

	const { form, errors, handleReset, handleSubmit, isValid, isSubmitting } = createForm({
		initialValues: {
			fullName: '',
			email: ''
		},
		validate: (values) => WaitingListSchema(values),
		onSubmit: async ({ fullName, email }) => {
			message = null
			messageType = 'error'
			const response = await addToWaitingList({ fullName, email })
			message = response.message
			if (response.statusCode === 200) {
				messageType = 'success'
			}
			handleReset()
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
			<input bind:value={$form.email} class="input" type="email" placeholder="Email" />
		</p>
		{#if $errors.email}
			<p class="help is-danger">{$errors.email}</p>
		{/if}
	</div>
	<div class="field">
		<p class="control">
			<button class="button is-fullwidth is-link">Add me to the waiting list</button>
		</p>
	</div>
</form>
