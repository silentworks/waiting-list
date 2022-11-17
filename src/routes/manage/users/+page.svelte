<script>
	import Layout from '../_layout.svelte'

	/** @type {import('./$types').PageData} */
	export let data
	let { users } = data
	$: ({ users } = data)
</script>

<Layout>
	<svelte:fragment slot="page-title">Users</svelte:fragment>

	<div class="box">
		<table class="table is-fullwidth is-hoverable is-striped">
			<thead>
				<tr>
					<th>Name</th>
				</tr>
			</thead>
			<tfoot>
				<tr>
					<th>Name</th>
				</tr>
			</tfoot>
			<tbody>
				{#each users as user, index}
					<tr>
						<td>{user.fullName}</td>
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
