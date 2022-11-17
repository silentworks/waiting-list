import { usersMapper } from '$lib/data/mappers/users'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'

/** @type {import('./$types').PageLoad} */
export const load = async (event) => {
	const { supabaseClient } = await getSupabase(event)
	const { error, data } = await supabaseClient
		.from('profiles')
		.select('*')
		.not('is_admin', 'eq', true)
		.order('created_at', { ascending: false })

	if (error) {
		return {
			users: []
		}
	}

	return {
		users: usersMapper(data)
	}
}
