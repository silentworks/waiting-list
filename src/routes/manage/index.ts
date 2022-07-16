import { withApiAuth } from '@supabase/auth-helpers-sveltekit'
import { getWaitingList } from '$lib/data/queries/waiting_list'
import { isSuccessResponse } from '$lib/data/mappers/internal'
import type { RequestHandler } from './__types/index'
import type { WaitingListMapper } from '$lib/data/mappers/waiting_list'

interface GetOutput {
	users: WaitingListMapper[]
}

export const get: RequestHandler<GetOutput> = async ({ locals }) =>
	withApiAuth(
		{
			redirectTo: '/auth/signin',
			user: locals.user
		},
		async () => {
			const users = await getWaitingList(locals)

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
