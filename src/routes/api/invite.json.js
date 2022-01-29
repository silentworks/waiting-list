import supabase from '$lib/admin'

export async function post({ request, locals }) {
	if (!locals.user.isAdmin) {
		return {
			status: 401,
			body: 'You are not authorized to make this request'
		}
	}

	const { user, redirectTo } = await request.json()
	const { data, error } = await supabase.auth.api.inviteUserByEmail(user.email, {
		data: {
			waiting_list_id: user.id,
			full_name: user.fullName,
			is_admin: false
		},
		redirectTo
	})

	if (error) {
		return {
			status: 400,
			body: 'There was an error sending the invite link.'
		}
	}

	return {
		status: 200,
		body: { ...user, isInvited: true, invitedAt: data.invited_at }
	}
}
