import { SignInSchema } from '$lib/validationSchema'
import { fail, redirect } from '@sveltejs/kit'
import { loadFlash } from 'sveltekit-flash-message/server'

export const load = loadFlash(async ({ locals: { getSession } }) => {
	const session = await getSession()

	if (session) {
		throw redirect(303, '/account')
	}
})

export const actions = {
	default: async (event) => {
		const {
			request,
			locals: { supabase }
		} = event
		const formData = await request.formData()
		const email = formData.get('email') as string
		const password = formData.get('password') as string

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

		throw redirect(303, '/account')
	}
}
