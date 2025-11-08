// src/routes/+layout.ts
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '../lib/schema'
import type { LayoutLoadEvent } from './$types'

export const load = async ({ fetch, data, depends }: LayoutLoadEvent) => {
	depends('supabase:auth')

	const supabase = createBrowserClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)

	const {
		data: { session }
	} = await supabase.auth.getSession()

	return { supabase, session, user: data.user }
}
