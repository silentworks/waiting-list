import { SignUpSchema } from '$lib/validationSchema'
import { fail, redirect } from '@sveltejs/kit'
import supabase from '$lib/admin'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const { data, error } = await supabase
		.from('profiles')
		.select('is_admin, confirmed_at')
		.eq('is_admin', true)
		.maybeSingle()

	if (!error) {
		if (data?.confirmed_at === null || !data?.is_admin) {
			return {}
		}
	}

	throw redirect(302, '/auth/signin')
}

export const actions: Actions = {
	default: async (event) => {
		const {
			request,
			locals: { supabase }
		} = event
		const formData = await request.formData()
		const email = formData.get('email') as string
		const password = formData.get('password') as string
		const fullName = formData.get('fullName') as string

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
				}
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
