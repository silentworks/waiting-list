import { loadFlash } from 'sveltekit-flash-message/server'

export const load = loadFlash(async ({ locals: { getSession, user } }) => {
	return {
		session: await getSession(),
		user
	}
})
