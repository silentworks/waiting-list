<script lang="ts">
	import {
		isSuccessResponse,
		type ErrorMapperResponse,
		type SuccessMapperResponse
	} from '$lib/data/mappers/internal'
	import type { WaitingListMapper } from '$lib/data/mappers/waiting_list'
	import type { WaitingList } from '$lib/types'

	export let user: WaitingListMapper
	export let inviteUser: (
		user: WaitingListMapper
	) => Promise<SuccessMapperResponse<WaitingList> | ErrorMapperResponse>

	let isLoading = false
	const invite = async () => {
		isLoading = true
		const res = await inviteUser(user)

		if (isSuccessResponse(res) && res.statusCode === 200) {
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
				disabled={isLoading}
				on:click={invite}>{user.isInvited ? 'Invite Again' : 'Invite'}</button
			>
			<button class="button is-danger is-small" disabled={user.isInvited} on:click={del}
				>Delete</button
			>
		</div>
	</td>
</tr>
