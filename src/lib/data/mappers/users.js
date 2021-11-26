import { withDefault } from './internal.js'

export const userMapper = (user) => ({
	fullName: withDefault(user.full_name, ''),
	isAdmin: user.is_admin
})

export const userToDBMapper = (user) => ({
	full_name: withDefault(user.fullName)
})

export const usersMapper = (users) => users.map((u) => userMapper(u))

export const loggedInUserMapper = (user) => ({
	last_sign_in_at: user.last_sign_in_at,
	authenticated: user.aud === 'authenticated',
	email: user.email,
	isAdmin: user.is_admin,
	id: user.id
})

export const combinedUserMapper = (user) => ({
	...loggedInUserMapper(user),
	...userMapper(user)
})
