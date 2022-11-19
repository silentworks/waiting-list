import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { ForgotPasswordSchema } from '$lib/auth/validationSchema'
import { invalid } from '@sveltejs/kit'
import { PUBLIC_APP_URL } from '$env/static/public'
import type { Actions } from './$types'

export const actions: Actions = {
	default: async (event) => {
		const { request } = event
		const { supabaseClient: supabase } = await getSupabase(event)
		const formData = await request.formData()
		const email = formData.get('email') as string
		const redirectTo = `${PUBLIC_APP_URL}`

		const test = ForgotPasswordSchema({ email })

		if (test !== true) {
			return invalid(400, { errors: test })
		}

		const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })

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
