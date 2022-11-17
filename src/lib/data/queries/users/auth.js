import { supabaseClient as supabase } from '$lib/db'
import { errorMapper, successMapper } from '$lib/data/mappers/internal'

export const triggerResetPasswordEmail = ({ email, redirectTo }) => {
	const { error } = supabase.auth.api.resetPasswordForEmail(email, { redirectTo })

	if (!error) {
		return successMapper({
			message: 'Reset email sent successfully, please check your email for the reset password link.'
		})
	}

	return errorMapper({
		message: error.message,
		code: 400
	})
}
