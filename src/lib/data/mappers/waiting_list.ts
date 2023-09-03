import type { Database } from '../../schema.js'
import { withDefault } from './internal.js'

export interface WaitingListMapper {
	id: string
	fullName: string | null
	email: string
	invitedAt: string | null
	isInvited: boolean
	isConfirmed: boolean
}

type WaitingListRow = Database['public']['Tables']['waiting_list']['Row']

export const waitingListMapper = (user: WaitingListRow): WaitingListMapper => ({
	id: user.id,
	fullName: withDefault(user.full_name, ''),
	email: user.email,
	invitedAt: user.invited_at,
	isInvited: user.invited_at ? true : false,
	isConfirmed: user.email_confirmed_at ? true : false
})

export const waitingListsMapper = (users: WaitingListRow[]): WaitingListMapper[] =>
	users.map((u) => waitingListMapper(u))
