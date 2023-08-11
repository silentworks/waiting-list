import { SupabaseClient, Session } from '@supabase/supabase-js'
import { Database } from './lib/schema'
import { CombinedUserMapper } from './lib/data/mappers/users'

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>
			getSession(): Promise<Session | null>
			user: CombinedUserMapper | null
		}

		interface PageData {
			session: Session | null
			user?: CombinedUserMapper
			flash?: { type: 'success' | 'error'; message: string }
		}

		// interface Error {}
		// interface Platform {}
	}
}
