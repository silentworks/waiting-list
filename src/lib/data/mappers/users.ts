import type { User } from '@supabase/supabase-js'
import { withDefault } from './internal.js'

interface UserMapper {
	fullName: string | null
	isAdmin: boolean
}

interface LoggedInUserMapper {
	last_sign_in_at: string
	authenticated: boolean
	email: string
	id: string
}

export type UserProfile = UserMapper & LoggedInUserMapper & User

export const userMapper = (user): UserMapper => ({
	fullName: withDefault<string, string>(user.full_name, ''),
	isAdmin: user.is_admin
})

export const userToDBMapper = (user) => ({
	full_name: withDefault<string, null>(user.fullName, null)
})

export const usersMapper = (users) => users.map((u) => userMapper(u))

export const loggedInUserMapper = (user): LoggedInUserMapper => ({
	last_sign_in_at: user.last_sign_in_at,
	authenticated: user.aud === 'authenticated',
	email: user.email,
	id: user.id
})

export const combinedUserMapper = (user) => ({
	...loggedInUserMapper(user),
	...userMapper(user)
})
