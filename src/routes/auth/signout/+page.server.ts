import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load = (async ({ locals: { supabase, getSession } }) => {
	const session = await getSession()

	if (session) {
		await supabase.auth.signOut()
		throw redirect(303, '/auth/signin')
	}
}) satisfies PageServerLoad
