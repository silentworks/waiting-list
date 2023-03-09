// src/hooks.server.ts
import { handleAuth } from '$lib/handleAuth'
import { handleProfile } from '$lib/handleProfile'
import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

export const handle: Handle = sequence(handleAuth, handleProfile)
