export async function setServerSession(event, session) {
	await fetch('/api/auth.json', {
		method: 'POST',
		headers: new Headers({ 'Content-Type': 'application/json' }),
		credentials: 'same-origin',
		body: JSON.stringify({ event, session })
	})
}

export const setAuthCookie = async (session) => await setServerSession('SIGNED_IN', session)
export const unsetAuthCookie = async () => await setServerSession('SIGNED_OUT', null)

export const getLoggedInUser = async (fetch) => {
	const res = await fetch('/api/auth.json')
	if (res.ok) {
		return {
			props: {
				user: await res.json()
			}
		}
	}

	return {
		status: res.status,
		error: new Error('User not logged in')
	}
}

export const checkIfLoggedIn = ({ session }, data = {}) => {
	if (!session?.user?.id) {
		return {
			status: 307,
			redirect: `/auth/signin`
		}
	}

	return { ...data }
}
