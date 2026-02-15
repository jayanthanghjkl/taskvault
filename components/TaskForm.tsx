'use client';

import { createTask } from '@/actions/taskActions';
import { useActionState } from 'react';
import { useRef } from 'react';
import { PlusCircle, Loader2 } from 'lucide-react';

const initialState = {
    error: null as string | null,
    success: false,
};

export default function TaskForm() {
    const [state, formAction, isPending] = useActionState(createTask, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    if (state.success && formRef.current) {
        formRef.current.reset();
    }

    return (
        <form action={formAction} ref={formRef} className="mb-6 md:mb-8">
            <div className="flex flex-col md:flex-row gap-3">
                <input
                    type="text"
                    name="title"
                    placeholder="What needs to be done?"
                    required
                    className="w-full md:flex-1 px-4 py-3.5 md:py-3 bg-white border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm placeholder:text-muted-foreground text-foreground text-base"
                />
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full md:w-auto bg-primary text-primary-foreground px-6 py-3.5 md:py-3 rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center justify-center md:justify-start gap-2 font-semibold md:font-medium shadow-[0_4px_14px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.4)] active:scale-[0.98]"
                >
                    {isPending ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <PlusCircle className="w-5 h-5" />
                    )}
                    <span>Add Task</span>
                </button>
            </div>
            {state.error && (
                <p className="text-destructive text-sm mt-3 flex items-center gap-2 pl-1 bg-destructive/5 p-2 rounded-lg border border-destructive/10 md:bg-transparent md:border-0 md:p-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive inline-block flex-shrink-0" />
                    {state.error}
                </p>
            )}
        </form>
    );
}
