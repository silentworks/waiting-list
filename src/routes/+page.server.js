import { WaitingListSchema } from '$lib/auth/validationSchema'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { invalid } from '@sveltejs/kit'

/** @type {import('./$types').LayoutServerLoad} */
export const load = async (event) => {
	const { session } = await getSupabase(event)

	return { session }
}

export const actions = {
	default: async (event) => {
		const { request } = event
		const { supabaseClient: supabase } = await getSupabase(event)
		const formData = await request.formData()
		const fullName = formData.get('fullName')
		const email = formData.get('email')

		const test = WaitingListSchema({ fullName, email })

		if (test !== true) {
			return invalid(400, { errors: test })
		}

		const { error } = await supabase.from('waiting_list').insert({ email, full_name: fullName })

		if (error) {
			return invalid(400, {
				success: false,
				message: `You've been successfully added to the waiting list.`
			})
		}

		return { success: true, message: `You've been successfully added to the waiting list.` }
	}
}
