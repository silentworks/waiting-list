/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/typescript
// for information about these interfaces
declare namespace App {
	interface Supabase {
		Database: import('./schema').Database
		SchemaName: 'public'
	}

	interface Locals {
		session: import('@supabase/auth-helpers-sveltekit').SupabaseSession
		user: import('./lib/data/mappers/users').CombinedUserMapper
	}

	interface PageData {
		session: import('@supabase/auth-helpers-sveltekit').SupabaseSession
	}

	// interface Error {}
	// interface Platform {}
}
