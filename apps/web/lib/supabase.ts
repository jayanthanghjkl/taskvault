import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { isValidUrl } from './utils'

export const createClient = async () => {
    const cookieStore = await cookies()

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!isValidUrl(supabaseUrl) || !supabaseAnonKey) {
        throw new Error(`Supabase environment variables are missing or invalid. 
            URL: "${supabaseUrl}" (Valid: ${isValidUrl(supabaseUrl)})
            Anon Key: "${supabaseAnonKey ? 'is set' : 'is missing'}"
            Please ensure NEXT_PUBLIC_SUPABASE_URL is a valid URL and NEXT_PUBLIC_SUPABASE_ANON_KEY is set in your .env file.`);
    }

    return createServerClient(
        supabaseUrl,
        supabaseAnonKey,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    )
}
