import { json } from '@sveltejs/kit';
import supabase from '$lib/admin'

export async function GET() {
	const { data, error } = await supabase
		.from('profiles')
		.select('is_admin')
		.eq('is_admin', true)
		.single()

	if (error) {
		return json({ isAdmin: false })
	}

	return json({ isAdmin: data?.is_admin })
}
