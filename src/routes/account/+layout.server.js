import { getServerSession } from '@supabase/auth-helpers-sveltekit'
import { redirect } from '@sveltejs/kit'

/** @type {import('./$types').LayoutServerLoad} */
export const load = async (event) => {
	const { user } = event.locals
	const session = await getServerSession(event)
	session.user = { ...session.user, ...user }
	if (!session) {
		throw redirect(303, '/auth/signin')
	}

	if (session.user?.isAdmin) {
		throw redirect(303, '/manage')
	}

	return { session }
}
