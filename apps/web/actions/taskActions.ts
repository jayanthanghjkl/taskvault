'use server';

import { createClient } from '@/lib/supabase';
import { taskSchema } from '@repo/common-types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createTask(prevState: unknown, formData: FormData) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const title = formData.get('title') as string;
    const validation = taskSchema.safeParse({ title });

    if (!validation.success) {
        return {
            error: validation.error.flatten().fieldErrors.title?.[0] || 'Invalid input',
            success: false
        };
    }

    const { error } = await supabase.from('tasks').insert({
        title: validation.data.title,
        user_id: user.id,
    });

    if (error) {
        return { error: error.message, success: false };
    }

    revalidatePath('/dashboard');
    return { success: true, error: null };
}

export async function getTasks() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return [];
    }

    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }

    return data;
}

export async function toggleTask(id: string, isCompleted: boolean) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { error } = await supabase
        .from('tasks')
        .update({ is_completed: isCompleted })
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/dashboard');
    return { success: true };
}

export async function deleteTask(id: string) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/dashboard');
    return { success: true };
}
