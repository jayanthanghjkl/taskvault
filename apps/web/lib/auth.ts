import { createClient } from './supabase';

export async function getUser() {
    const supabase = await createClient(); // Await the async function
    const {
        data: { user },
    } = await supabase.auth.getUser();
    return user;
}
