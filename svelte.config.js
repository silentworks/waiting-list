import adapter from '@sveltejs/adapter-auto'
import adapterNode from '@sveltejs/adapter-node'

const dev = process.env.NODE_ENV === 'development'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: dev
			? adapterNode({ env: { port: process.env.PORT } })
			: adapter({ env: { port: process.env.PORT } }),
		vite: {
			ssr: {
				noExternal: dev ? [] : ['@supabase/supabase-js']
			}
		}
	}
}

export default config
