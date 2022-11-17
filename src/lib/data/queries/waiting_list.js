import { supabaseClient as supabase } from '$lib/db'
import { errorMapper, successMapper } from '$lib/data/mappers/internal'
import { waitingListsMapper } from '../mappers/waiting_list'

export const addToWaitingList = async ({ email, fullName }) => {
	const { error } = await supabase.from('waiting_list').insert({ email, full_name: fullName })

	if (!error) {
		return successMapper({
			message: `You've been successfully added to the waiting list.`
		})
	}

	return successMapper({
		message: `You've been successfully added to the waiting list.`
	})
}

export const deleteFromWaitingList = async ({ id }) => {
	const { error } = await supabase.from('waiting_list').delete().match({ id })

	if (!error) {
		return successMapper({
			message: `You've successfully delete an entry from the waiting list.`
		})
	}

	return successMapper({
		message: `You've successfully delete an entry from the waiting list.`
	})
}

export const getWaitingList = async ({ supabase }) => {
	const { data, error } = await supabase
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
