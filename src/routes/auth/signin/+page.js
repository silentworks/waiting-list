import { redirect } from '@sveltejs/kit'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'

/** @type {import('./$types').PageLoad} */
export async function load(event) {
	const { session } = await getSupabase(event)
	if (session) {
		throw redirect(303, '/account')
	}
}
