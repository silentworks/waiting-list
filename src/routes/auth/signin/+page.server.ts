import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { SignInSchema } from '$lib/validationSchema'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async (event) => {
	const { session } = await getSupabase(event)
	if (session) {
		throw redirect(303, '/account')
	}
}

export const actions: Actions = {
	default: async (event) => {
		const { request } = event
		const { supabaseClient: supabase } = await getSupabase(event)
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
