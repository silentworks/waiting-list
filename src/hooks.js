import { handleAuth } from '@supabase/auth-helpers-sveltekit'
import { sequence } from '@sveltejs/kit/hooks'
import { handleProfile } from '$lib/handleProfile'

export const handle = sequence(...handleAuth({ logout: { returnTo: '/auth/signin' }}), handleProfile)

export async function getSession(event) {
	const { user, accessToken } = event.locals

	return {
		user,
		accessToken
	}
}
