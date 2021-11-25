// Create a single supabase client for interacting with your database
let importEnv = true

try {
	if (process.env.NODE_ENV === 'test') importEnv = false
} catch (error) {
	// log.error({ error });
}

/**
 * @const {string}
 */
export const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_APP_URL } = !importEnv
	? process.env
	: import.meta.env
