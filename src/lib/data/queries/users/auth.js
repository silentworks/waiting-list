import supabase from '$lib/db'
import { errorMapper, successMapper } from '$lib/data/mappers/internal'

export const signIn = async ({ email, password }) => {
	const { error } = await supabase.auth.signIn({ email, password })

	if (!error) {
		return successMapper({
			message: `You've successfully logged in`
		})
	}

	return errorMapper({
		message: `The email that you've entered doesn't belong to an account. Please check your email and try again.`,
		code: 400
	})
}

export const signUp = async ({ username, full_name, email, password, redirectTo = '' }) => {
	const { error } = await supabase.auth.signUp(
		{ email, password },
		{
			data: {
				username,
				full_name
			},
			redirectTo
		}
	)

	if (!error) {
		return successMapper({
			message: 'Signup successfully, please check your email for a confirmation message.'
		})
	}

	return errorMapper({
		message: error.message,
		code: 400
	})
}

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

export const updatePassword = async ({ password }) => {
	const { error } = await supabase.auth.update({ password })

	if (!error) {
		return successMapper({
			message: 'Password updated successfully.'
		})
	}

	return errorMapper({
		message: error.message,
		code: 400
	})
}

export const signOut = async () => {
	const { error } = await supabase.auth.signOut()

	if (!error) {
		return successMapper({
			message: 'Logged out successfully'
		})
	}

	return errorMapper({
		message: error.message,
		code: error.code
	})
}
