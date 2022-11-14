import { getServerSession } from '@supabase/auth-helpers-sveltekit'

/** @type {import('./$types').LayoutServerLoad} */
export const load = async (event) => {
	return {
		session: await getServerSession(event)
	}
}
