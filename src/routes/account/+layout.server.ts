import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { getSession, user } }) => {
	const session = await getSession()

	if (!session) {
		throw redirect(303, '/auth/signin')
	}

	if (user?.isAdmin) {
		throw redirect(303, '/manage')
	}

	return { session }
}
