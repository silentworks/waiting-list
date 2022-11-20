import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { combinedUserMapper, type UserProfileProp } from '$lib/data/mappers/users'
import type { Handle } from '@sveltejs/kit'

export const handleProfile: Handle = async ({ event, resolve }) => {
	const { session, supabaseClient } = await getSupabase(event)

	if (session) {
		const { user } = session
		if (user) {
			const { data: profile } = await supabaseClient
				.from('profiles')
				.select('*')
				.eq('id', user?.id)
				.maybeSingle()

			const userProfile: UserProfileProp = Object.assign(user, profile)
			event.locals.user = combinedUserMapper(userProfile)
		}
	}

	return await resolve(event)
}
