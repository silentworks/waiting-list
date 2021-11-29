<script>
	export let user = {}
	export let inviteUser = async () => {
		await new Promise()
	}

	let isLoading = false
	const invite = async () => {
		isLoading = true
		const res = await inviteUser(user)

		if (res.statusCode === 200) {
			user = res.data
			isLoading = false
		}

		if (res.statusCode !== 200) {
			isLoading = false
		}
	}
	const del = async () => {}
</script>

<tr>
	<td>{user.fullName} </td>
	<td><a href="mailto:{user.email}">{user.email}</a></td>
	<td>{user.isInvited ? 'Yes' : 'No'}</td>
	<td>
		<div class="buttons">
			<button
				class="button is-success is-small"
				class:is-loading={isLoading}
				disabled={user.isInvited || isLoading}
				on:click={invite}>Invite</button
			>
			<button class="button is-danger is-small" disabled={user.isInvited} on:click={del}
				>Delete</button
			>
		</div>
	</td>
</tr>
