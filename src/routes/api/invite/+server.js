import { json } from '@sveltejs/kit'
import supabase from '$lib/admin'

export async function POST({ request, locals }) {
	console.log({ locals })
	if (!locals.session.user.isAdmin) {
		return new Response('You are not authorized to make this request', { status: 401 })
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
		return new Response('There was an error sending the invite link.', { status: 400 })
	}

	return json({ ...user, isInvited: true, invitedAt: data.invited_at })
}
