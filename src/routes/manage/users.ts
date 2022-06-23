import { withApiAuth } from '@supabase/auth-helpers-sveltekit'
import { getProfiles } from '$lib/data/queries/users/getProfile'

export const get = async ({ locals }) =>
	withApiAuth(
		{
			redirectTo: '/auth/signin',
			user: locals.user
		},
		async () => {
			const users = await getProfiles(locals)

			if (users.statusCode === 200) {
				return {
					body: {
						users: users.data
					}
				}
			}

			return {
				body: {
					users: []
				}
			}
		}
	)
