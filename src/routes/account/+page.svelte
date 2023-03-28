<script lang="ts">
	export let data

	$: ({ user } = data)
</script>

<svelte:head>
	<title>WLA</title>
</svelte:head>

<p class="py-1 is-size-5 has-text-weight-slim">
	Welcome {user?.fullName}
</p>

<div class="content">
	<div class="block">Thanks for taking the time to check this tutorial and project out</div>
	<div class="block">
		Resources used in this project
		<ul>
			<li>
				<a href="https://supabase.com/docs/reference/javascript/auth-onauthstatechange"
					>Auth State change</a
				>
			</li>
			<li>
				<a href="https://supabase.com/docs/reference/javascript/auth-admin-inviteuserbyemail"
					>Invite user</a
				>
			</li>
			<li>
				<a href="https://supabase.com/docs/reference/javascript/auth-signinwithotp"
					>Sign in with magic link</a
				>
			</li>
		</ul>
	</div>
</div>
