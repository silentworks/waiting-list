<script>
	import { env } from '$env/dynamic/public'
	import Layout from './_layout.svelte'
	import { deleteFromWaitingList, inviteFromWaitingList } from '$lib/data/queries/waiting_list'
	import WaitingListTableRow from '$lib/table/WaitingListTableRow.svelte'

	/** @type {import('./$types').PageData} */
	export let data
	let { users } = data
	$: ({ users } = data)

	const redirectTo = `${env.PUBLIC_APP_URL}logging-in?redirect=/account/password-update`

	let isLoading = false
	const inviteUser = async (user) => {
		isLoading = true
		const res = await inviteFromWaitingList(user, redirectTo)

		if (res.statusCode === 200) {
			user = res.data
			isLoading = false
		}

		if (res.statusCode !== 200) {
			isLoading = false
		}
	}

	const deleteUser = async (user) => {
		await deleteFromWaitingList({ id: user.id })
	}
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
					<WaitingListTableRow {user} {inviteUser} {deleteUser} />
				{/each}
			</tbody>
		</table>
	</div>
</Layout>
