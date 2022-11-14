import { redirect } from '@sveltejs/kit';


export const load = async ({ fetch }) => {
	const res = await fetch('/api/admin.json')

	if (res.ok) {
		const { isAdmin } = await res.json()
		if (!isAdmin) {
			return 
		}
	}

	throw redirect(302, '/auth/signin');
}
