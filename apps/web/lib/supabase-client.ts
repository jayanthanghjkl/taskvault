import { createBrowserClient } from '@supabase/ssr'
import { isValidUrl } from './utils'

export const createBrowserSupabaseClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!isValidUrl(supabaseUrl) || !supabaseAnonKey) {
        if (process.env.NODE_ENV === 'development') {
            console.warn('Supabase environment variables are missing or invalid in the browser client.');
        }
    }

    return createBrowserClient(
        isValidUrl(supabaseUrl) ? supabaseUrl : 'https://invalid-url.co',
        supabaseAnonKey || ''
    )
}
