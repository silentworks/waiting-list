export const get = async ({ locals }) => {
	return {
		body: {
			isLoggedIn: locals?.user?.id ?? false
		}
	}
}
