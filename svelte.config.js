import adapter from '@sveltejs/adapter-node'

const dev = process.env.NODE_ENV === 'development'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({ env: { port: process.env.PORT } }),
		vite: {
			ssr: {
				noExternal: dev ? [] : ['@supabase/supabase-js']
			}
		}
	}
}

export default config
