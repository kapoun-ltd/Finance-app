import { createClient } from '@supabase/supabase-js'

// project url
const supabaseUrl = 'https://jrzlnmbyfcpknjrkfxwj.supabase.co'
const supabaseKey = 'sb_publishable_XkHuDNrSvyHI8GndNm83kw_HYjcfG54'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;