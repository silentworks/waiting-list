import type { LayoutServerLoad } from './$types'
import { redirect } from '@sveltejs/kit'

export const load = (async (event) => {
	const { user, getSession } = event.locals
	const session = await getSession()

	if (!session) {
		throw redirect(303, '/auth/signin')
	}

	if (!user?.isAdmin) {
		throw redirect(303, '/account')
	}

	return { session }
}) satisfies LayoutServerLoad
