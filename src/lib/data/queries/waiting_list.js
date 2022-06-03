import supabase from '$lib/db'
import { supabaseServerClient } from '@supabase/auth-helpers-sveltekit'
import { errorMapper, successMapper } from '$lib/data/mappers/internal'
import { waitingListsMapper } from '../mappers/waiting_list'

export const addToWaitingList = async ({ email, fullName }) => {
	const { error } = await supabase
		.from('waiting_list')
		.insert({ email, full_name: fullName }, { returning: 'minimal' })

	if (!error) {
		return successMapper({
			message: `You've been successfully added to the waiting list.`
		})
	}

	return successMapper({
		message: `You've been successfully added to the waiting list.`
	})
}

export const getWaitingList = async ({ accessToken }) => {
	const { data, error } = await supabaseServerClient(accessToken)
		.from('waiting_list')
		.select('*')
		.order('created_at', { ascending: false })

	if (!error) {
		return successMapper({
			data: waitingListsMapper(data),
			message: 'Waiting list retrieved successfully.'
		})
	}

	return errorMapper({
		message: error.message,
		statusCode: 400
	})
}

export const inviteFromWaitingList = async (user, redirectTo) => {
	const res = await fetch('/api/invite.json', {
		method: 'POST',
		headers: new Headers({ 'Content-Type': 'application/json' }),
		credentials: 'same-origin',
		body: JSON.stringify({ user, redirectTo })
	})

	if (res.ok) {
		return successMapper({
			data: await res.json()
		})
	}

	return errorMapper({
		message: 'Something went wrong!!!',
		statusCode: 400
	})
}
