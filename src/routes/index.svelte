<script>
	import WaitingListForm from '$lib/auth/WaitingListForm.svelte'

	export let isLoggedIn
</script>

<div class="container is-max-desktop p-6">
	{#if isLoggedIn}
		<section class="columns">
			<div class="column is-full">
				<div class="box">
					<p class="has-text-centered">
						You are currently signed in <a href="/account">Take me to my account</a>
					</p>
				</div>
			</div>
		</section>
	{:else}
		<section class="columns mt-6 pt-6">
			<div class="column is-half is-hidden-touch">
				<figure class="image is-5by3">
					<img src="/img/WaitingList_Placeholder.png" alt="Waiting List App" />
				</figure>
			</div>
			<div class="column is-half-desktop is-half-tablet-only">
				<div class="box p-6">
					<h2 class="subtitle is-3 has-text-centered pb-4">Waiting List App</h2>
					<div class="content">
						<WaitingListForm />
					</div>
				</div>
			</div>
		</section>
		<section class="columns">
			<div class="column is-full">
				<div class="box">
					<p class="has-text-centered">
						Have you been invited already? <a href="/auth/signin">Sign in</a>
					</p>
				</div>
			</div>
		</section>
	{/if}
</div>
