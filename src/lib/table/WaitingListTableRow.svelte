<script>
	export let position = 0
	export let name = ''
	export let email = ''
	export let isInvited = false
</script>

<tr>
	<th>{position}</th>
	<td>{name} </td>
	<td><a href="mailto:{email}">{email}</a></td>
	<td>{isInvited ? 'Yes' : 'No'}</td>
	<td>
		<div class="buttons">
			<button class="button is-success is-small" disabled={isInvited}>Invite</button>
			<button class="button is-danger is-small" disabled={isInvited}>Delete</button>
		</div>
	</td>
</tr>
