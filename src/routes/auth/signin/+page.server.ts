import { SignInSchema } from '$lib/validationSchema'
import { fail, redirect } from '@sveltejs/kit'
import { loadFlash } from 'sveltekit-flash-message/server'
import type { Actions, PageServerLoad } from './$types.js'

export const load: PageServerLoad = loadFlash(async (event) => {
	const {
		locals: { getSession }
	} = event
	const session = await getSession()

	if (session) {
		redirect(303, '/account');
	}
})

export const actions: Actions = {
	default: async (event) => {
		const {
			url,
			request,
			locals: { supabase }
		} = event
		const formData = await request.formData()
		const email = formData.get('email') as string
		const password = formData.get('password') as string
		const next = new URL(url.searchParams.get('next') ?? '/account', url)

		const test = SignInSchema({ email, password })

		if (test !== true) {
			return fail(400, { errors: test, email })
		}

		const { error } = await supabase.auth.signInWithPassword({ email, password })

		if (error) {
			return fail(400, {
				success: false,
				email,
				message: `The email that you've entered doesn't belong to an account. Please check your email and try again.`
			})
		}

		redirect(303, next.pathname);
	}
}
