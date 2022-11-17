import '$lib/db'
import { sequence } from '@sveltejs/kit/hooks'
import { handleProfile } from '$lib/handleProfile'

export const handle = sequence(handleProfile)
