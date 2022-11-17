import { WaitingListSchema } from '$lib/auth/validationSchema'
import { addToWaitingList } from '$lib/data/queries/waiting_list'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { invalid } from '@sveltejs/kit'

/** @type {import('./$types').LayoutServerLoad} */
export const load = async (event) => {
	const { session } = await getSupabase(event)

	return { session }
}

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData()
		const fullName = formData.get('fullName')
		const email = formData.get('email')

		const test = WaitingListSchema({ fullName, email })

		if (test !== true) {
			return invalid(400, { errors: test })
		}

		const response = await addToWaitingList({ fullName, email })

		if (response.statusCode !== 200) {
			return invalid(400, { success: false, message: response.message })
		}

		return { success: true, message: response.message }
	}
}
