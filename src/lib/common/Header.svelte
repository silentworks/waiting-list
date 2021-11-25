<script>
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { signOut } from '$lib/data/queries/users/auth'

	let showDropdown = false
	const dropDown = () => (showDropdown = !showDropdown)

	async function handleSignOut() {
		await signOut()
		goto('/auth')
	}
</script>

<nav class="navbar" role="navigation" aria-label="main navigation">
	<div class="container is-max-desktop">
		<div class="navbar-brand">
			<a class="navbar-item" href="/">Supagram</a>
		</div>

		<div class="sg-search mx-6">
			<div class="control">
				<input
					class="input"
					type="text"
					placeholder="search"
					spellcheck="false"
					role="combobox"
					aria-autocomplete="list"
					aria-expanded="false"
					aria-label="search"
				/>
			</div>
		</div>

		<div class="navbar-menu">
			<div class="navbar-end">
				<a class="navbar-item" href="/">Home</a>
				<a class="navbar-item" href="/direct">Direct</a>
				<a class="navbar-item" href="/explore">Explore</a>
				<div class="navbar-item has-dropdown" class:is-active={showDropdown}>
					<button class="button is-medium is-ghost" on:click={dropDown}>
						<figure class="image">
							<img
								class="is-rounded"
								src="https://avatars.githubusercontent.com/u/54469796"
								alt="Placeholder"
							/>
						</figure>
					</button>

					<div class="navbar-dropdown" on:click={dropDown}>
						<a href="/profile" class="navbar-item" class:is-active={$page.path == '/profile'}
							>Profile</a
						>
						<a
							href="/profile/saved"
							class="navbar-item"
							class:is-active={$page.path == '/profile/saved'}>Saved</a
						>
						<a href="/accounts/edit" class="navbar-item">Settings</a>
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
	.navbar-brand {
		width: 200px;
	}
	.sg-search {
		padding: 0.5rem 0.75rem;
		width: 30%;
	}
</style>
