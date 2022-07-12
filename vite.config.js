// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';

// const dev = process.env.NODE_ENV === 'development'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  // optimizeDeps: {
  //   exclude: dev ? [] : ['@supabase/supabase-js']
  // }
};

export default config;
