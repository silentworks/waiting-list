import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { SignUpSchema } from '$lib/auth/validationSchema'
import { invalid, redirect } from '@sveltejs/kit'
import { PUBLIC_APP_URL } from '$env/static/public'
import supabase from '$lib/admin'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const { data, error } = await supabase
		.from('profiles')
		.select('is_admin')
		.eq('is_admin', true)
		.maybeSingle()

	if (!error) {
		if (!data?.is_admin) {
			return {}
		}
	}

	throw redirect(302, '/auth/signin')
}

export const actions: Actions = {
	default: async (event) => {
		const { request } = event
		const { supabaseClient: supabase } = await getSupabase(event)
		const formData = await request.formData()
		const email = formData.get('email') as string
		const password = formData.get('password') as string
		const fullName = formData.get('fullName') as string
		const emailRedirectTo = `${PUBLIC_APP_URL}logging-in`

		const test = SignUpSchema({ email, password, fullName })

		if (test !== true) {
			return invalid(400, { errors: test, email, password, fullName })
		}

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					is_admin: true,
					full_name: fullName
				},
				emailRedirectTo
			}
		})

		if (error) {
			return invalid(400, {
				success: false,
				message: error.message,
				email,
				password,
				fullName
			})
		}

		return {
			success: true,
			message: 'Signup successfully, please check your email for a confirmation message.'
		}
	}
}
