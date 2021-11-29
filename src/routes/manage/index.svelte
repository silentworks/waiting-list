<script context="module">
	import { getWaitingList } from '$lib/data/queries/waiting_list'

	export const load = async ({ session }) => {
		const users = await getWaitingList()

		if (users.statusCode === 200) {
			return {
				props: {
					users: users.data
				}
			}
		}

		return {
			props: {
				users: []
			}
		}
	}
</script>

<script>
	import Layout from './_layout.svelte'
	import WaitingListTableRow from '$lib/table/WaitingListTableRow.svelte'

	export let users
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
					<WaitingListTableRow {user} />
				{/each}
			</tbody>
		</table>
	</div>
</Layout>
