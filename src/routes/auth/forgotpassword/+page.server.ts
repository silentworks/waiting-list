import { ForgotPasswordSchema } from '$lib/validationSchema'
import { fail } from '@sveltejs/kit'

export const actions = {
	default: async (event) => {
		const {
			url,
			request,
			locals: { supabase }
		} = event
		const formData = await request.formData()
		const email = formData.get('email') as string
		const redirectTo = `${url.origin}/logging-in?next=/account/password-update`

		const test = ForgotPasswordSchema({ email })

		if (test !== true) {
			return fail(400, { errors: test, email })
		}

		const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })

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
