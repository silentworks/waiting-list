/* eslint-disable no-unused-vars */
import * as cookie from 'cookie'

/**
 * Converts a SvelteKit request to a Express compatible request.
 * Supabase expects the cookies to be parsed.
 * @param {Request} req
 * @param body
 * @returns Express.Request
 */
export async function toExpressRequest(req, body = {}) {
	return {
		body,
		headers: { host: req.headers.get('host') },
		cookies: cookie.parse(req.headers.get('cookie') || '')
	}
}

/**
 * Converts a SvelteKit response into an Express compatible response.
 * @param {SvelteKit.Response} resp
 * @returns Express.Response
 */
export function toExpressResponse(resp) {
	return {
		...resp,
		getHeader: (header) => resp.headers.get(header.toLowerCase()),
		setHeader: (header, value) => resp.headers.set(header.toLowerCase(), value),
		status: (_) => ({ json: (_) => {}, end: (_) => {} })
	}
}
