import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async (event) => {
	const { user, getSession } = event.locals
	const session = await getSession()

	if (!session) {
		redirect(303, '/auth/signin');
	}

	if (!user?.isAdmin) {
		redirect(303, '/account');
	}

	return { session }
}
