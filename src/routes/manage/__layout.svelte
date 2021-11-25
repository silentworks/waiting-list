<script context="module">
	import { checkIfLoggedIn } from '$lib/session'
	export const load = async ({ session }) => checkIfLoggedIn({ session })
</script>

<script>
	import { session } from '$app/stores'
</script>

<svelte:head>
	<title>Waiting List App</title>
</svelte:head>

<div class="column is-2">
  <div class="columns is-flex-direction-column is-fullheight is-gapless has-background-light">
    <div class="column">
      <div class="menu-label px-4 py-4 has-background-dark has-text-white is-size-6">
        Waiting List App
      </div>
      <aside class="menu p-4">
        <p class="menu-label">Welcome back {$session?.user?.fullName}</p>
        <ul class="menu-list">
          <li><a href="/manage" class="is-active">Dashboard</a></li>
          <li><a href="/manage/users">Users</a></li>
        </ul>
      </aside>
    </div>
    <div class="menu-footer p-4">
      <p>Hello</p>
    </div>
  </div>
</div>
<div class="column is-10">
  <div class="p-6">
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li><a href="/">Waiting List App</a></li>
        <li class="is-active"><a href="/manage" aria-current="page">Dashboard</a></li>
      </ul>
    </nav>
    <slot />
  </div>
</div>