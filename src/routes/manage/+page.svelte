<script lang="ts">
	import Layout from './_layout.svelte'
	import Notification from '$lib/common/Notification.svelte'
	import ButtonAction from '$lib/common/ButtonAction.svelte'
	import type { ActionData, PageData } from './$types'

	export let form: ActionData

	export let data: PageData
	let { users } = data
	$: ({ users } = data)
</script>

<Layout>
	<Notification
		showNotification={form?.message !== undefined}
		status={form?.success ? 'success' : 'error'}
	>
		{form?.message}
	</Notification>
	<div class="box">
		<table class="table is-fullwidth is-hoverable is-striped">
			<thead>
				<tr>
					<th>Name</th>
					<th>Email</th>
					<th>Invited</th>
					<th>Action</th>
				</tr>
			</thead>
			<tfoot>
				<tr>
					<th>Name</th>
					<th>Email</th>
					<th>Invited</th>
					<th>Action</th>
				</tr>
			</tfoot>
			<tbody>
				{#each users as user}
					<tr>
						<td>{user.fullName} </td>
						<td><a href="mailto:{user.email}">{user.email}</a></td>
						<td>{user.isInvited ? 'Yes' : 'No'}</td>
						<td>
							<div class="buttons">
								<ButtonAction action="?/invite" isLoading={false}>
									<svelte:fragment slot="inputs">
										<input name="user" value={JSON.stringify(user)} type="hidden" />
									</svelte:fragment>
									{user.isInvited ? 'Invite Again' : 'Invite'}
								</ButtonAction>
								<ButtonAction action="?/remove" class="is-danger ml-1" isDisabled={user.isInvited}>
									<svelte:fragment slot="inputs">
										<input name="userId" value={user.id} type="hidden" />
									</svelte:fragment>
									Delete
								</ButtonAction>
							</div>
						</td>
					</tr>
				{:else}
					<tr>
						<td colspan="4" class="has-text-centered">No user was found on the waiting list</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</Layout>
