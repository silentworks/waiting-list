<script>
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import { signOut } from '$lib/data/queries/users/auth'

	async function handleSignOut() {
		await signOut()
		await goto('/auth/signin')
	}
</script>

<svelte:head>
	<title>Waiting List App</title>
</svelte:head>

<div class="column has-background-white-ter">
	<div class="columns is-flex-direction-column is-fullheight is-gapless has-background-white">
		<div class="column">
			<div class="menu-label px-4 py-4 has-background-black-ter has-text-white is-size-6 mb-0">
				Waiting List App
			</div>
			<aside class="menu">
				<ul class="menu-list">
					<li>
						<a
							href="/manage"
							class="p-4"
							class:has-background-white-ter={$page.url.pathname == '/manage'}>Dashboard</a
						>
					</li>
					<li>
						<a
							href="/manage/users"
							class="p-4"
							class:has-background-white-ter={$page.url.pathname == '/manage/users'}>Users</a
						>
					</li>
				</ul>
			</aside>
		</div>
		<div class="menu-footer p-4">
			<a
				href="/manage/logout"
				class="button is-black is-fullwidth"
				on:click|preventDefault={handleSignOut}>Log Out</a
			>
		</div>
	</div>
</div>
<div class="column is-9 is-10-desktop has-background-white-ter">
	<slot />
</div>
