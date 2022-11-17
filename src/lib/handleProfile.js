import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { combinedUserMapper } from '$lib/data/mappers/users'

export async function handleProfile({ event, resolve }) {
	const { session, supabaseClient } = await getSupabase(event)

	if (session) {
		const { user } = session
		if (user) {
			const { data: profile } = await supabaseClient
				.from('profiles')
				.select('*')
				.eq('id', user?.id)
				.maybeSingle()
			event.locals.user = combinedUserMapper({ ...user, ...profile })
		}
	}

	return await resolve(event)
}
