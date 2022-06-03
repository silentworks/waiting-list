import { withApiAuth } from '@supabase/auth-helpers-sveltekit'
import { getWaitingList } from '$lib/data/queries/waiting_list'

export const get = async ({ locals }) =>
	withApiAuth(
		{
			redirectTo: '/auth/signin',
			user: locals.user
		},
		async () => {
			const users = await getWaitingList(locals)

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
