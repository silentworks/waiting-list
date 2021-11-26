import { createClient } from '@supabase/supabase-js'
import { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } from './env'

const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)

export default supabase
