import { ResetPasswordSchema } from '$lib/validationSchema'
import { fail } from '@sveltejs/kit'

export const actions = {
	default: async (event) => {
		const {
			request,
			locals: { supabase }
		} = event
		const formData = await request.formData()
		const password = formData.get('password') as string
		const passwordConfirm = formData.get('passwordConfirm') as string

		const test = ResetPasswordSchema({ password, passwordConfirm })

		if (test !== true) {
			return fail(400, { errors: test, password, passwordConfirm })
		}

		const { error } = await supabase.auth.updateUser({ password })

		if (error) {
			return fail(400, {
				success: false,
				message: error.message
			})
		}

		return {
			success: true,
			message: 'Password updated successfully.'
		}
	}
}
