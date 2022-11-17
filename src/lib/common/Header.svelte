<script>
	import { page } from '$app/stores'
	import { supabaseClient } from '$lib/db'

	let showDropdown = false
	const dropDown = () => (showDropdown = !showDropdown)

	const keyboardDropDown = ({ key, target }) => {
		if (key === 'Escape') {
			showDropdown = false
		}
	}

	function handleSignOut() {
		supabaseClient.auth.signOut()
	}
</script>

<nav class="navbar" aria-label="main navigation">
	<div class="container is-max-desktop">
		<div class="navbar-brand">
			<a class="navbar-item" href="/account">WLA</a>
		</div>

		<div class="navbar-menu">
			<div class="navbar-end">
				<div
					class="navbar-item has-dropdown"
					class:is-active={showDropdown}
					on:keyup={keyboardDropDown}
					on:mouseleave={() => {
						showDropdown = false
					}}
				>
					<button class="button is-medium is-ghost" on:click={dropDown}>
						<figure class="image">
							<img
								class="is-rounded"
								src="https://avatars.githubusercontent.com/u/54469796"
								alt="Placeholder"
							/>
						</figure>
					</button>

					<div class="navbar-dropdown">
						<a
							href="/account/password-update"
							class="navbar-item"
							class:is-active={$page.url.pathname == '/password-update'}>Update Password</a
						>
						<hr class="navbar-divider" />
						<a href="/logout" class="navbar-item" on:click|preventDefault={handleSignOut}>Log Out</a
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</nav>

<style>
	nav {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		padding: 10px 0;
		border-bottom: 1px solid rgba(219, 219, 219, 1);
	}
</style>
