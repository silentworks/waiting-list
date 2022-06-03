<script>
	import { VITE_APP_URL } from '$lib/env'
	import Layout from './_layout.svelte'
	import WaitingListTableRow from '$lib/table/WaitingListTableRow.svelte'
	import { inviteFromWaitingList } from '$lib/data/queries/waiting_list'

	export let users

	const redirectTo = `${VITE_APP_URL}logging-in?redirect=/account/password-update`

	const inviteUser = async (user) => await inviteFromWaitingList(user, redirectTo)
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
					<WaitingListTableRow {user} {inviteUser} />
				{/each}
			</tbody>
		</table>
	</div>
</Layout>
