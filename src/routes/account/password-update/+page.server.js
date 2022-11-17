import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { ResetPasswordSchema } from '$lib/auth/validationSchema'
import { invalid } from '@sveltejs/kit'

export const actions = {
	default: async (event) => {
		const { request } = event
		const { supabaseClient: supabase } = await getSupabase(event)
		const formData = await request.formData()
		const password = formData.get('password')
		const passwordConfirm = formData.get('passwordConfirm')

		const test = ResetPasswordSchema({ password, passwordConfirm })

		console.log({ test })
		if (test !== true) {
			return invalid(400, { errors: test, password, passwordConfirm })
		}

		const { error } = await supabase.auth.updateUser({ password })

		if (error) {
			return invalid(400, {
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
