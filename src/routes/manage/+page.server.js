import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { getWaitingList } from '$lib/data/queries/waiting_list'

/** @type {import('./$types').PageLoad} */
export const load = async (event) => {
	const { supabaseClient } = await getSupabase(event)
	const users = await getWaitingList({ supabase: supabaseClient })

	if (users.statusCode === 200) {
		return {
			users: users.data
		}
	}

	return {
		users: []
	}
}
