'use client';

import TaskItem from './TaskItem';

type Task = {
    id: string;
    title: string;
    is_completed: boolean;
};

export default function TaskList({ tasks }: { tasks: Task[] }) {
    if (tasks.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                No tasks yet. Create one above!
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    );
}
