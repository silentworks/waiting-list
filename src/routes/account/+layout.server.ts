import type { LayoutServerLoad } from './$types'
import { redirect } from '@sveltejs/kit'

export const load = (async ({ locals: { getSession, user } }) => {
	const session = await getSession()

	if (!session) {
		throw redirect(303, '/auth/signin')
	}

	if (user?.isAdmin) {
		throw redirect(303, '/manage')
	}

	return { session }
}) satisfies LayoutServerLoad
