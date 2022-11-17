import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { getWaitingList } from '$lib/data/queries/waiting_list'
import { invalid } from '@sveltejs/kit'
import { env } from '$env/dynamic/public'

/** @type {import('./$types').PageLoad} */
export const load = async (event) => {
	const { supabaseClient } = await getSupabase(event)
	const users = await getWaitingList({ supabase: supabaseClient })

	if (users.statusCode !== 200) {
		return {
			users: []
		}
	}

	return {
		users: users.data
	}
}

export const actions = {
	invite: async (event) => {
		const { locals, request } = event
		const { supabaseClient: supabase } = await getSupabase(event)
		if (!locals.user.isAdmin) {
			return invalid(401, { message: 'You are not authorized to make this request' })
		}

		const formData = await request.formData()
		const formUser = formData.get('user')
		const redirectTo = `${env.PUBLIC_APP_URL}logging-in?redirect=/account/password-update`

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
