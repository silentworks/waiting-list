import supabase from '$lib/db'
import { successMapper } from '$lib/data/mappers/internal'

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
