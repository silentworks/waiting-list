import { WaitingListSchema } from '$lib/validationSchema'
import type { PageServerLoad, Actions } from './$types'
import { fail } from '@sveltejs/kit'

export const load = (async ({ locals: { getSession } }) => {
	const session = await getSession()

	return { session }
}) satisfies PageServerLoad

export const actions = {
	default: async (event) => {
		const {
			request,
			locals: { supabase }
		} = event
		const formData = await request.formData()
		const fullName = formData.get('fullName') as string
		const email = formData.get('email') as string

		const test = WaitingListSchema({ fullName, email })

		if (test !== true) {
			return fail(400, { errors: test, fullName, email })
		}

		const { error } = await supabase.from('waiting_list').insert({ email, full_name: fullName })

		if (error) {
			return fail(400, {
				success: false,
				message: `You've been successfully added to the waiting list.`
			})
		}

		return { success: true, message: `You've been successfully added to the waiting list.` }
	}
} satisfies Actions
