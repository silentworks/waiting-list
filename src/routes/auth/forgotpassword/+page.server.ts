import { ForgotPasswordSchema } from '$lib/validationSchema'
import { fail } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
	default: async (event) => {
		const {
			url,
			request,
			locals: { supabase }
		} = event
		const formData = await request.formData()
		const email = formData.get('email') as string

		const test = ForgotPasswordSchema({ email })

		if (test !== true) {
			return fail(400, { errors: test, email })
		}

		const { error } = await supabase.auth.resetPasswordForEmail(email)

		if (error) {
			return fail(400, {
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
