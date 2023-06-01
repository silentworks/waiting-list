import { InviteTokenSchema } from '$lib/validationSchema'
import { fail, redirect } from '@sveltejs/kit'

export const load = async ({ locals: { getSession } }) => {
	const session = await getSession()

	if (session) {
		throw redirect(303, '/account')
	}
}

export const actions = {
	default: async (event) => {
		const {
			request,
			locals: { supabase }
		} = event
		const formData = await request.formData()
		const email = formData.get('email') as string
		const token = formData.get('token') as string

		const test = InviteTokenSchema({ email, token })

		if (test !== true) {
			return fail(400, { errors: test, email })
		}

		const { error } = await supabase.auth.verifyOtp({ email, token, type: 'email' })

		if (error) {
			return fail(400, {
				success: false,
				email,
				message: `The email that you've entered doesn't belong to an account. Please check your email and try again.`
			})
		}

		throw redirect(303, '/account/password-update')
	}
}
