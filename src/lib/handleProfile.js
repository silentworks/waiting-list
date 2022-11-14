import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { combinedUserMapper } from '$lib/data/mappers/users'
import { getProfileById } from '$lib/data/queries/users/getProfile'

export async function handleProfile({ event, resolve }) {
	const { session, supabaseClient } = await getSupabase(event)

	if (session) {
		const { user } = session
		if (user) {
			const profile = await getProfileById({ supabaseClient, userId: user?.id })
			event.locals.user = combinedUserMapper({ ...user, ...profile })
		}
	}

	return await resolve(event)
}
