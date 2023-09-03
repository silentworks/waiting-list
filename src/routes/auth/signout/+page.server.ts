import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
	default: async (event) => {
		const {
			locals: { supabase, getSession }
		} = event
		const session = await getSession()

		if (session) {
			await supabase.auth.signOut()
			throw redirect(303, '/auth/signin')
		}
	}
}
