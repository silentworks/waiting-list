import { handleAuth } from '$lib/handleAuth'

export const handle = async ({ request, resolve }) => handleAuth({ request, resolve })

export async function getSession(request) {
  const { user, token } = request.locals
  return {
    user,
    token
  }
}
