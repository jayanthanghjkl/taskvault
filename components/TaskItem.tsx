'use client';

import { toggleTask, deleteTask } from '@/actions/taskActions';
import { Trash2, CheckCircle, Circle } from 'lucide-react';
import { startTransition, useOptimistic } from 'react';

type Task = {
    id: string;
    title: string;
    is_completed: boolean;
};

export default function TaskItem({ task }: { task: Task }) {
    const [optimisticTask, setOptimisticTask] = useOptimistic(
        task,
        (state, newStatus: boolean) => ({ ...state, is_completed: newStatus })
    );

    const handleToggle = async () => {
        const newStatus = !optimisticTask.is_completed;
        startTransition(() => {
            setOptimisticTask(newStatus);
        });
        await toggleTask(task.id, newStatus);
    };

    const handleDelete = async () => {
        // Removed confirm for a cleaner feel, could add a better UI confirmation later
        await deleteTask(task.id);
    };

    return (
        <div className={`group flex items-center justify-between p-5 bg-card rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-border/60 hover:border-primary/30 hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)] transition-all duration-300 ${optimisticTask.is_completed ? 'bg-muted/30' : ''}`}>
            <div className="flex items-center gap-4 flex-1">
                <button
                    onClick={handleToggle}
                    className={`relative flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-300 ${optimisticTask.is_completed
                            ? 'bg-emerald-500 border-emerald-500 text-white shadow-[0_2px_8px_rgba(16,185,129,0.3)]'
                            : 'border-muted-foreground/30 hover:border-primary text-transparent hover:bg-primary/5'
                        }`}
                >
                    <CheckCircle className={`w-4 h-4 transition-transform duration-300 ${optimisticTask.is_completed ? 'scale-100' : 'scale-0'}`} />
                </button>
                <span
                    className={`text-lg font-medium transition-colors duration-300 ${optimisticTask.is_completed
                            ? 'line-through text-muted-foreground decoration-border'
                            : 'text-foreground'
                        }`}
                >
                    {task.title}
                </span>
            </div>
            <button
                onClick={handleDelete}
                className="opacity-50 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all duration-200 p-2 rounded-lg hover:bg-destructive/10"
                aria-label="Delete task"
            >
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
    );
}
