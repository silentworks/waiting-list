import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { ForgotPasswordSchema } from '$lib/auth/validationSchema'
import { invalid } from '@sveltejs/kit'
import { env } from '$env/dynamic/public'

export const actions = {
	default: async (event) => {
		const { request } = event
		const { supabaseClient: supabase } = await getSupabase(event)
		const formData = await request.formData()
		const email = formData.get('email')
		const redirectTo = `${env.PUBLIC_APP_URL}`

		const test = ForgotPasswordSchema({ email })

		if (test !== true) {
			return invalid(400, { errors: test })
		}

		const { error } = supabase.auth.resetPasswordForEmail(email, { redirectTo })

		if (error) {
			return invalid(400, {
				success: false,
				message: error.message
			})
		}

		return {
			success: true,
			message: 'Reset email sent successfully, please check your email for the reset password link.'
		}
	}
}
