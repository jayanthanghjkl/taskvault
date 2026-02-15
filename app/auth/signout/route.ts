
import { createClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const supabase = await createClient();

    // Check if a user's logged in
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        await supabase.auth.signOut();
    }

    revalidatePath('/', 'layout');

    // Redirect to login page using 303 See Other to ensure the method changes to GET
    return NextResponse.redirect(new URL('/login', req.url), {
        status: 303,
    });
}
