import supabase from '$lib/admin'

export async function post(req) {
	const { user, redirectTo } = req.body
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
