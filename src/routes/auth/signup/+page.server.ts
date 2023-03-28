import { SignUpSchema } from '$lib/validationSchema'
import { fail, redirect } from '@sveltejs/kit'
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
		const {
			url,
			request,
			locals: { supabase }
		} = event
		const formData = await request.formData()
		const email = formData.get('email') as string
		const password = formData.get('password') as string
		const fullName = formData.get('fullName') as string
		const emailRedirectTo = `${url.origin}/logging-in`

		const test = SignUpSchema({ email, password, fullName })

		if (test !== true) {
			return fail(400, { errors: test, email, password, fullName })
		}

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					is_admin: true,
					full_name: fullName
				},
				emailRedirectTo
			}
		})

		if (error) {
			return fail(400, {
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
