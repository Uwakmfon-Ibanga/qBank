// this code takes the envivonment variables from the .env file and converts them into the appropriate javascript variables.

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_ANON_KEY


const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase