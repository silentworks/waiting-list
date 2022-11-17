import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { SignUpSchema } from '$lib/auth/validationSchema'
import { invalid, redirect } from '@sveltejs/kit'
import { env } from '$env/static/public'
import supabase from '$lib/admin'

export const load = async () => {
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

export const actions = {
	default: async (event) => {
		const { request } = event
		const { supabaseClient: supabase } = await getSupabase(event)
		const formData = await request.formData()
		const email = formData.get('email')
		const password = formData.get('password')
		const fullName = formData.get('fullName')
		const redirectTo = `${env.PUBLIC_APP_URL}logging-in`

		const test = SignUpSchema({ email, password, fullName })

		if (test !== true) {
			return invalid(400, { errors: test, email, password, fullName })
		}

		const { error } = await supabase.auth.signUp(
			{ email, password },
			{
				data: {
					is_admin: true,
					full_name: fullName
				},
				redirectTo
			}
		)

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
