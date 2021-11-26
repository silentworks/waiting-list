import { errorMapper, successMapper } from '$lib/data/mappers/internal'
import { usersMapper } from '$lib/data/mappers/users'
import supabase from '$lib/db'

export const getProfile = async () => {
	const { data } = await supabase.from('profiles').select('*').single()
	return data
}

export const getProfileById = async (userId) => {
	const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
	return data
}

export const getProfiles = async () => {
	const { error, data } = await supabase.from('profiles').select('*').not('is_admin', 'eq', true)

	if (!error) {
		return successMapper({
			data: usersMapper(data),
			message: ''
		})
	}

	return errorMapper({
		message: ''
	})
}
