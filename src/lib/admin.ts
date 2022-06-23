import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config()
const env = process.env

const supabase = createClient(env.VITE_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)

export default supabase
