import { withApiAuth } from '@supabase/auth-helpers-sveltekit'
import { getProfiles } from '$lib/data/queries/users/getProfile'
import { isSuccessResponse } from '$lib/data/mappers/internal'
import type { RequestHandler } from './__types/users'

interface GetOutput {
	users: unknown
}

export const get = async ({ locals }) =>
	withApiAuth(
		{
			redirectTo: '/auth/signin',
			user: locals.user
		},
		async () => {
			const users = await getProfiles(locals)

			if (isSuccessResponse(users) && users.statusCode === 200) {
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
