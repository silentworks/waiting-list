<script lang="ts">
	import Layout from '../Layout.svelte'
	import Notification from '$lib/common/Notification.svelte'
	import ButtonAction from '$lib/common/ButtonAction.svelte'

	export let form
	export let data

	let { users, user } = data
	$: ({ users, user } = data)
</script>

<Layout {user}>
	<svelte:fragment slot="page-title">Users</svelte:fragment>
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
					<th>Action</th>
				</tr>
			</thead>
			<tfoot>
				<tr>
					<th>Name</th>
					<th>Action</th>
				</tr>
			</tfoot>
			<tbody>
				{#each users as user}
					<tr>
						<td>{user.fullName}</td>
						<td>
							<div class="buttons">
								<ButtonAction action="?/remove" class="is-danger">
									<svelte:fragment slot="inputs">
										<input name="userId" value={user.id} type="hidden" />
										<input name="userFullName" value={user.fullName} type="hidden" />
									</svelte:fragment>
									Delete
								</ButtonAction>
							</div>
						</td>
					</tr>
				{:else}
					<tr>
						<td colspan="2" class="has-text-centered">No user has been invited as yet</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</Layout>
