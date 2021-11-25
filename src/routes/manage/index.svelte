<script>
	import WaitingListTableRow from '$lib/table/WaitingListTableRow.svelte'
</script>

<table class="table is-fullwidth is-hoverable is-striped">
	<thead>
		<tr>
			<th><abbr title="Position">Pos</abbr></th>
			<th>Name</th>
			<th>Email</th>
			<th>Invited</th>
			<th>Action</th>
		</tr>
	</thead>
	<tfoot>
		<tr>
			<th><abbr title="Position">Pos</abbr></th>
			<th>Name</th>
			<th>Email</th>
			<th>Invited</th>
			<th>Action</th>
		</tr>
	</tfoot>
	<tbody>
		<WaitingListTableRow
			position={1}
			name="James Bond"
			email="james-bond@example.com"
			isInvited={true}
		/>
		<WaitingListTableRow
			position={2}
			name="Tommy Lee"
			email="tommy-lee@example.com"
			isInvited={false}
		/>
		<WaitingListTableRow
			position={3}
			name="Brad Pit"
			email="bradpit@example.com"
			isInvited={false}
		/>
	</tbody>
</table>
