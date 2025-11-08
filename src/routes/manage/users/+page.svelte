<script lang="ts">
	import Layout from '../Layout.svelte'
	import Notification from '$lib/common/Notification.svelte'
	import ButtonAction from '$lib/common/ButtonAction.svelte'

	let { form, data } = $props()
	let { users, user } = $derived(data)
</script>

<Layout {user}>
	{#snippet pageTitle()}Users{/snippet}
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
									{#snippet inputs()}
										<input name="userId" value={user.id} type="hidden" />
										<input name="userFullName" value={user.fullName} type="hidden" />	
									{/snippet}
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
