import { fail } from '@sveltejs/kit'
import { waitingListsMapper } from '$lib/data/mappers/waiting_list'
import type { Actions, PageServerLoad } from './$types'
import supabase from '$lib/admin'

export const load = (async (event) => {
	const {
		locals: { supabase }
	} = event
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
}) satisfies PageServerLoad

export const actions = {
	invite: async (event) => {
		const { locals, request, url } = event
		if (!locals.user.isAdmin) {
			return fail(401, { message: 'You are not authorized to make this request' })
		}

		const formData = await request.formData()
		const formUser = formData.get('user') as string
		const redirectTo = `${url.origin}/logging-in?redirect=/account/password-update`

		if (!formUser) {
			return fail(400, { user: formUser, missing: true })
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
			return fail(400, { message: 'There was an error sending the invite link.' })
		}

		return { ...user, isInvited: true, invitedAt: data.user.invited_at }
	},
	remove: async (event) => {
		const {
			request,
			locals: { supabase, user }
		} = event
		if (!user.isAdmin) {
			return fail(401, { message: 'You are not authorized to make this request' })
		}

		const formData = await request.formData()
		const userId = formData.get('userId')

		if (!userId) {
			return fail(400, { userId: userId, missing: true })
		}

		// check if invited before allowing delete
		const { data } = await supabase
			.from('waiting_list')
			.select()
			.match({ id: userId })
			.maybeSingle()

		if (data && data.invited_at) {
			return fail(400, {
				message: `You cannot delete ${data.full_name} from the waiting list`
			})
		}

		const { error } = await supabase.from('waiting_list').delete().match({ id: userId })
		if (error) {
			return fail(400, { message: 'There was an error deleting the user.' })
		}

		return { success: true, message: 'User was deleted successfully' }
	}
} satisfies Actions
