import { redirect } from '@sveltejs/kit'

/**
 * @type {import('@sveltejs/kit').PageLoad}
 */
export async function load() {
	throw redirect(302, '/auth/signin')
}
