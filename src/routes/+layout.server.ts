import { loadFlash } from 'sveltekit-flash-message/server'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = loadFlash(async ({ locals: { getSession, user } }) => {
	return {
		session: await getSession(),
		user
	}
})
