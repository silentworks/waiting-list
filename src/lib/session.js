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
