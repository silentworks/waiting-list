import { skHelper } from '@supabase/auth-helpers-sveltekit'
import { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } from './env'

const { supabaseClient: supabase } = skHelper(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)

export default supabase
