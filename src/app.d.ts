import { SupabaseClient, Session } from '@supabase/supabase-js'
import { Database } from './lib/schema'
import { CombinedUserMapper } from './lib/data/mappers/users'

/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/typescript
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>
			getSession(): Promise<Session | null>
			user: CombinedUserMapper
		}

		interface PageData {
			session: Session | null
			user?: CombinedUserMapper
		}

		// interface Error {}
		// interface Platform {}
	}
}
