<script lang="ts">
	import { enhance } from '$app/forms'
	import { page } from '$app/state'
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
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
							class:has-background-white-ter={page.url.pathname == '/manage'}>Dashboard</a
						>
					</li>
					<li>
						<a
							href="/manage/users"
							class="p-4"
							class:has-background-white-ter={page.url.pathname == '/manage/users'}>Users</a
						>
					</li>
				</ul>
			</aside>
		</div>
		<div class="menu-footer p-4">
			<form action="/auth/signout" method="post" use:enhance>
				<button class="button is-black is-fullwidth">Log Out</button>
			</form>
		</div>
	</div>
</div>
<div class="column is-9 is-10-desktop has-background-white-ter">
	{@render children?.()}
</div>
