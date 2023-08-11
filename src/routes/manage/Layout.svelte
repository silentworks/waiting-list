<script lang="ts">
	import type { CombinedUserMapper } from '$lib/data/mappers/users'
	export let user: CombinedUserMapper | null
</script>

<div class="menu-label px-4 py-4 has-background-dark has-text-white is-size-6">
	<slot name="page-title">Dashboard</slot>
</div>
<p class="px-6 py-1 is-size-5 has-text-weight-medium">
	Welcome back {#if user}{user?.fullName}{/if}
</p>
<div class="p-6">
	<slot />
</div>
