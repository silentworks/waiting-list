import type { User } from '@supabase/supabase-js'
import type { Database } from '../../schema.js'
import { withDefault } from './internal.js'

interface UserMapper {
	id: string
	fullName: string | null
	isAdmin: boolean
}

interface LoggedInUserMapper {
	last_sign_in_at?: string
	authenticated: boolean
	email?: string
	id: string
}

type ProfileRow = Database['public']['Tables']['profiles']['Row']
type UserProp = Pick<ProfileRow, 'id' | 'full_name' | 'is_admin'>
type MyUser = Pick<User, 'id' | 'email' | 'aud' | 'last_sign_in_at'>

export const userMapper = (user: UserProp): UserMapper => ({
	id: user.id,
	fullName: withDefault<string | null, string>(user.full_name, ''),
	isAdmin: user.is_admin ? true : false
})

export const usersMapper = (users: UserProp[]) => users.map((u) => userMapper(u))

export const loggedInUserMapper = (user: MyUser): LoggedInUserMapper => ({
	last_sign_in_at: user.last_sign_in_at,
	authenticated: user.aud === 'authenticated',
	email: user.email,
	id: user.id
})

export type UserProfileProp = MyUser & UserProp
export type CombinedUserMapper = LoggedInUserMapper & UserMapper

export const combinedUserMapper = (user: UserProfileProp) => ({
	...loggedInUserMapper(user),
	...userMapper(user)
})
