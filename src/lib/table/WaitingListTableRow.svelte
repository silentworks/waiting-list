<script>
	export let user = {}
	export let inviteUser = async () => {
		await new Promise()
	}

	export let deleteUser = async () => {
		await new Promise()
	}

	let isInviting = false
	let isDeleting = false
	const invite = async () => {
		isInviting = true
		const res = await inviteUser(user)

		if (res.statusCode === 200) {
			user = res.data
			isInviting = false
		}

		if (res.statusCode !== 200) {
			isInviting = false
		}
	}

	const del = async () => {
		isDeleting = true
		const res = await deleteUser(user)
		isDeleting = false
	}
</script>

<tr>
	<td>{user.fullName} </td>
	<td><a href="mailto:{user.email}">{user.email}</a></td>
	<td>{user.isInvited ? 'Yes' : 'No'}</td>
	<td>
		<div class="buttons">
			<button
				class="button is-success is-small"
				class:is-loading={isInviting}
				disabled={isInviting}
				on:click={invite}>{user.isInvited ? 'Invite Again' : 'Invite'}</button
			>
			<button
				class="button is-danger is-small"
				class:is-loading={isDeleting}
				disabled={user.isInvited}
				on:click={del}>Delete</button
			>
		</div>
	</td>
</tr>
