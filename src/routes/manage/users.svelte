<script context="module">
	import { getProfiles } from '$lib/data/queries/users/getProfile'

	export const load = async ({ session }) => {
		const users = await getProfiles()

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

	export let users
</script>

<Layout>
	<svelte:fragment slot="page-title">Users</svelte:fragment>

	<div class="box">
		<table class="table is-fullwidth is-hoverable is-striped">
			<thead>
				<tr>
					<th><abbr title="Position">Pos</abbr></th>
					<th>Name</th>
				</tr>
			</thead>
			<tfoot>
				<tr>
					<th><abbr title="Position">Pos</abbr></th>
					<th>Name</th>
				</tr>
			</tfoot>
			<tbody>
				{#each users as user, index}
					<tr>
						<th>{index + 1}</th>
						<td>{user.fullName} </td>
					</tr>
				{:else}
					<tr>
						<td colspan="2" class="has-text-centered">No records found</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</Layout>
