export async function post({ locals }) {
	const { user, accessToken } = locals
	return {
		status: 200,
		body: {
			user,
			accessToken
		}
	}
}
