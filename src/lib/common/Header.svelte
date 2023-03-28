<script lang="ts">
	import { page } from '$app/stores'

	let showDropdown = false
	const dropDown = () => (showDropdown = !showDropdown)

	const keyboardDropDown = ({ key }: { key: string }) => {
		if (key === 'Escape') {
			showDropdown = false
		}
	}
</script>

<nav class="navbar" aria-label="main navigation">
	<div class="container is-max-desktop">
		<div class="navbar-brand">
			<a class="navbar-item" href="/account">WLA</a>
		</div>

		<div class="navbar-menu">
			<div class="navbar-end">
				<div class="navbar-item">
					<div class="field is-grouped">
						<div class="control">
							<a
								href="/account/password-update"
								class="button is-ghost"
								class:is-active={$page.url.pathname == '/password-update'}>Update Password</a
							>
						</div>
						<div class="control">
							<form action="/auth/signout" method="post">
								<button class="button is-danger">Log Out</button>
							</form>
						</div>
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
