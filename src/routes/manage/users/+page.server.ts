import { usersMapper } from '$lib/data/mappers/users'
import type { PageServerLoad } from './$types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'

export const load: PageServerLoad = async (event) => {
	const { supabaseClient: supabase } = await getSupabase(event)
	const { error, data } = await supabase
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
