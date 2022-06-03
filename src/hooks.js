import { handleCallback, handleUser } from '@supabase/auth-helpers-sveltekit'
import { sequence } from '@sveltejs/kit/hooks'
import { handleProfile } from '$lib/handleProfile'

export const handle = sequence(handleCallback(), handleUser(), handleProfile)

export async function getSession(event) {
	const { user, accessToken } = event.locals

	return {
		user,
		accessToken
	}
}
