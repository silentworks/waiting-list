import supabase from '$lib/admin'

export async function GET() {
	const { data, error } = await supabase
		.from('profiles')
		.select('is_admin')
		.eq('is_admin', true)
		.single()

	if (error) {
		return {
			status: 200,
			body: { isAdmin: false }
		}
	}

	return {
		status: 200,
		body: { isAdmin: data?.is_admin }
	}
}
