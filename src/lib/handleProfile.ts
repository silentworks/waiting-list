import { combinedUserMapper, type UserProfileProp } from '$lib/data/mappers/users'
import type { Handle } from '@sveltejs/kit'

export const handleProfile: Handle = async ({ event, resolve }) => {
	const { getSession, supabase } = event.locals
	const session = await getSession()

	if (session) {
		const { user } = session
		if (user) {
			const { data: profile } = await supabase
				.from('profiles')
				.select('*')
				.eq('id', user?.id)
				.maybeSingle()

			const userProfile: UserProfileProp = Object.assign(user, profile)
			event.locals.user = combinedUserMapper(userProfile)
		}
	} else {
		event.locals.user = null
	}

	return resolve(event)
}
