import { combinedUserMapper } from '$lib/data/mappers/users'
import { getProfileById } from '$lib/data/queries/users/getProfile'

export async function handleProfile({ event, resolve }) {
	const { user, accessToken } = event.locals

	const profile = await getProfileById({ accessToken, userId: user?.id })
	if (user) {
		event.locals.user = combinedUserMapper({ ...user, ...profile })
	}

	let response = await resolve(event)

	return response
}
