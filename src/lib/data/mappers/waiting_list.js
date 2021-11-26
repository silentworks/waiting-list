import { withDefault } from './internal.js'

export const waitingListMapper = (user) => ({
  id: user.id,
	fullName: withDefault(user.full_name, ''),
  email: user.email,
  invitedAt: user.invited_at,
  isInvited: user.invited_at ?  true : false,
})

export const waitingListsMapper = (users) => users.map((u) => waitingListMapper(u))
