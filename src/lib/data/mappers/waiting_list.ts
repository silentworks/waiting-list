import { withDefault } from './internal.js'

export interface WaitingListMapper {
	id: string
	fullName: string | null
	email: string
	invitedAt: string
	isInvited: boolean
}

export const waitingListMapper = (user): WaitingListMapper => ({
	id: user.id,
	fullName: withDefault(user.full_name, ''),
	email: user.email,
	invitedAt: user.invited_at,
	isInvited: user.invited_at ? true : false
})

export const waitingListsMapper = (users): WaitingListMapper[] =>
	users.map((u) => waitingListMapper(u))
