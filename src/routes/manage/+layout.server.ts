import type { LayoutServerLoad } from './$types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { redirect } from '@sveltejs/kit'

export const load: LayoutServerLoad = async (event) => {
	const { user } = event.locals
	const { session } = await getSupabase(event)

	if (!session) {
		throw redirect(303, '/auth/signin')
	}

	session.user = { ...session.user, ...user }

	if (!user?.isAdmin) {
		throw redirect(303, '/account')
	}

	return { session }
}
