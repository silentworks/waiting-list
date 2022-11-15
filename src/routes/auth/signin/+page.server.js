import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { SignInSchema } from '$lib/auth/validationSchema'
import { signIn } from '$lib/data/queries/users/auth'
import { invalid, redirect } from '@sveltejs/kit'

export const actions = {
	default: async (event) => {
		const { request } = event
		const { supabaseClient: supabase } = await getSupabase(event)
		const formData = await request.formData()
		const email = formData.get('email')
		const password = formData.get('password')

		const test = SignInSchema({ email, password })

		if (test !== true) {
			return invalid(400, { errors: test })
		}

		const { error } = await supabase.auth.signInWithPassword({ email, password })

		if (error) {
			return invalid(400, {
				success: false,
				message: `The email that you've entered doesn't belong to an account. Please check your email and try again.`
			})
		}

		throw redirect(303, '/account')
	}
}
