import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { getProfiles } from '$lib/data/queries/users/getProfile'

/** @type {import('./$types').PageLoad} */
export const load = async (event) => {
	const { supabaseClient } = await getSupabase(event)
	const users = await getProfiles({ supabaseClient })

	if (users.statusCode !== 200) {
		return {
			users: []
		}
	}

	return {
		users: users.data
	}
}
