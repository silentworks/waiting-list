import { usersMapper } from '$lib/data/mappers/users'
import type { Actions, PageServerLoad } from './$types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { invalid } from '@sveltejs/kit'
import supabase from '$lib/admin'

export const load: PageServerLoad = async (event) => {
	const { supabaseClient: supabase } = await getSupabase(event)
	const { error, data } = await supabase
		.from('profiles')
		.select('*')
		.not('is_admin', 'eq', true)
		.order('created_at', { ascending: false })

	if (error) {
		return {
			users: []
		}
	}

	return {
		users: usersMapper(data)
	}
}

export const actions: Actions = {
	remove: async (event) => {
		const { locals, request } = event
		if (!locals.user.isAdmin) {
			return invalid(401, { message: 'You are not authorized to make this request' })
		}

		const formData = await request.formData()
		const userId = formData.get('userId') as string
		const userFullName = formData.get('userFullName') as string

		if (!userId) {
			return invalid(400, { userId: userId, missing: true })
		}

		// check if invited before allowing delete
		const { error } = await supabase.auth.admin.deleteUser(userId)

		if (error) {
			return invalid(400, {
				message: `You cannot delete ${userFullName} from the waiting list`
			})
		}

		return { success: true, message: 'User was deleted successfully' }
	}
}
