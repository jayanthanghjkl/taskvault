'use client';

import TaskItem from './TaskItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import AssignmentIcon from '@mui/icons-material/Assignment';

type Task = {
    id: string;
    title: string;
    is_completed: boolean;
};

export default function TaskList({ tasks }: { tasks: Task[] }) {
    if (tasks.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <AssignmentIcon sx={{ fontSize: 48, opacity: 0.2 }} />
                <Typography variant="body1">
                    No tasks yet. Create one above!
                </Typography>
            </Box>
        );
    }

    return (
        <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </List>
    );
}
