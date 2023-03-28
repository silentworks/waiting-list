<script lang="ts">
	import Notification from '$lib/common/Notification.svelte'
	import { enhance } from '$app/forms'

	export let form
	export let data

	$: ({ user } = data)
</script>

<div class="container is-max-desktop p-6">
	{#if user?.id}
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
						<Notification
							showNotification={form?.message !== undefined}
							status={form?.success ? 'success' : 'error'}
						>
							{form?.message}
						</Notification>

						<form method="POST" use:enhance>
							<div class="field">
								<p class="control">
									<input
										name="fullName"
										value={form?.fullName ?? ''}
										class="input"
										type="text"
										placeholder="Full Name"
									/>
								</p>
								{#if form?.errors?.fullName}
									<p class="help is-danger">{form?.errors?.fullName}</p>
								{/if}
							</div>
							<div class="field">
								<p class="control">
									<input
										name="email"
										value={form?.email ?? ''}
										class="input"
										type="email"
										placeholder="Email"
									/>
								</p>
								{#if form?.errors?.email}
									<p class="help is-danger">{form?.errors?.email}</p>
								{/if}
							</div>
							<div class="field">
								<p class="control">
									<button class="button is-fullwidth is-link">Add me to the waiting list</button>
								</p>
							</div>
						</form>
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
