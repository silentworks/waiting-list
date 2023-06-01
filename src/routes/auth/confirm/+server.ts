import { ConfirmTokenSchema } from '$lib/validationSchema'
import type { EmailOtpType } from '@supabase/supabase-js'
import { fail, redirect } from '@sveltejs/kit'
import { setFlash } from 'sveltekit-flash-message/server'

export const GET = async (event) => {
	let {
		url,
		locals: { supabase }
	} = event
	const token = url.searchParams.get('token_hash') as string
	const authType = (url.searchParams.get('type') ?? 'email') as EmailOtpType
	let next = url.searchParams.get('next') ?? '/account'

	const test = ConfirmTokenSchema({ token })

	if (test !== true) {
		throw fail(400, { errors: test })
	}

	const { error } = await supabase.auth.verifyOtp({ token_hash: token, type: authType })

	if (error) {
		setFlash(
			{
				type: 'error',
				message: `The token you have used has expired, please try getting invited again.`
			},
			event
		)
		next = '/auth/signin'
	}

	throw redirect(303, `/${next.slice(1)}`)
}
