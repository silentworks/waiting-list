import supabase from '$lib/db'
import { toExpressRequest, toExpressResponse } from '$lib/expressify'
import { combinedUserMapper } from '$lib/data/mappers/users'
import { getProfileById } from '$lib/data/queries/users/getProfile'

export async function handleAuth({ event, resolve }) {
	// Converts request to have `req.headers.cookie` on `req.cookies, as `getUserByCookie` expects parsed cookies on `req.cookies`
	const request = event.request
	const expressStyleRequest = await toExpressRequest(request)
	const { user } = await supabase.auth.api.getUserByCookie(expressStyleRequest)
	const profile = await getProfileById(user?.id)
	event.locals.token = expressStyleRequest.cookies['sb:token'] || undefined
	event.locals.user = combinedUserMapper({ ...user, ...profile })

	// if we have a token, set the client to use it so we can make authorized requests to Supabase
	if (event.locals.token) {
		supabase.auth.setAuth(event.locals.token)
	}

	let response = await resolve(event)

	// if auth request - set cookie in response headers
	if (request.method == 'POST' && event.url.pathname === '/api/auth.json') {
		const reqBody = await request.json()
		const req = await toExpressRequest(request, reqBody)
		supabase.auth.api.setAuthCookie(req, toExpressResponse(response))
	}

	return response
}
