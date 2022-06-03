import { supabaseServerClient } from '@supabase/auth-helpers-sveltekit'
import { errorMapper, successMapper } from '$lib/data/mappers/internal'
import { usersMapper } from '$lib/data/mappers/users'
import supabase from '$lib/db'

export const getProfile = async () => {
	const { data } = await supabase.from('profiles').select('*').single()
	return data
}

export const getProfileById = async ({ accessToken, userId }) => {
	const { data } = await supabaseServerClient(accessToken)
		.from('profiles')
		.select('*')
		.eq('id', userId)
		.single()
	return data
}

export const getProfiles = async ({ accessToken }) => {
	const { error, data } = await supabaseServerClient(accessToken)
		.from('profiles')
		.select('*')
		.not('is_admin', 'eq', true)
		.order('created_at', { ascending: false })

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
