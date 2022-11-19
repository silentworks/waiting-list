import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { invalid } from '@sveltejs/kit'
import { PUBLIC_APP_URL } from '$env/static/public'
import { waitingListsMapper } from '$lib/data/mappers/waiting_list'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async (event) => {
	const { supabaseClient: supabase } = await getSupabase(event)
	const { data, error } = await supabase
		.from('waiting_list')
		.select('*')
		.order('created_at', { ascending: false })

	if (error) {
		return {
			users: []
		}
	}

	return {
		users: waitingListsMapper(data)
	}
}

export const actions: Actions = {
	invite: async (event) => {
		const { locals, request } = event
		const { supabaseClient: supabase } = await getSupabase(event)
		if (!locals.user.isAdmin) {
			return invalid(401, { message: 'You are not authorized to make this request' })
		}

		const formData = await request.formData()
		const formUser = formData.get('user')
		const redirectTo = `${PUBLIC_APP_URL}logging-in?redirect=/account/password-update`

		if (!formUser) {
			return invalid(400, { user: formUser, missing: true })
		}

		const user = JSON.parse(formUser)

		const { data, error } = await supabase.auth.admin.inviteUserByEmail(user.email, {
			data: {
				waiting_list_id: user.id,
				full_name: user.fullName,
				is_admin: false
			},
			redirectTo
		})

		if (error) {
			return invalid(400, { message: 'There was an error sending the invite link.' })
		}

		return { ...user, isInvited: true, invitedAt: data.invited_at }
	},
	remove: async (event) => {
		const { locals, request } = event
		const { supabaseClient: supabase } = await getSupabase(event)
		if (!locals.user.isAdmin) {
			return invalid(401, { message: 'You are not authorized to make this request' })
		}

		const formData = await request.formData()
		const userId = formData.get('userId')

		if (!userId) {
			return invalid(400, { userId: userId, missing: true })
		}

		// check if invited before allowing delete
		const { data } = await supabase
			.from('waiting_list')
			.select()
			.match({ id: userId })
			.maybeSingle()

		if (data) {
			return invalid(400, {
				message: `You cannot delete ${data.full_name} from the waiting list`
			})
		}

		const { error } = await supabase.from('waiting_list').delete().match({ id: userId })
		if (error) {
			return invalid(400, { message: 'There was an error deleting the user.' })
		}

		return { success: true }
	}
}
