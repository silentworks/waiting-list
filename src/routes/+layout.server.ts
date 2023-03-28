export const load = async ({ locals: { getSession, user } }) => {
	return {
		session: await getSession(),
		user
	}
}
