<script>
	import Layout from './_layout.svelte'
	import ButtonAction from '$lib/common/ButtonAction.svelte'

	/** @type {import('./$types').PageData} */
	export let data
	let { users } = data
	$: ({ users } = data)
</script>

<Layout>
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
								<ButtonAction action="?/remove" class="is-danger ml-1">
									<svelte:fragment slot="inputs">
										<input name="userId" value={user.id} type="hidden" />
									</svelte:fragment>
									Delete
								</ButtonAction>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</Layout>
