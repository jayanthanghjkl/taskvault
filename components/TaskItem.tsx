'use client';

import { toggleTask, deleteTask } from '@/actions/taskActions';
import { startTransition, useOptimistic, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
    const [isDeleting, setIsDeleting] = useState(false);

    const handleToggle = async () => {
        const newStatus = !optimisticTask.is_completed;
        startTransition(() => {
            setOptimisticTask(newStatus);
        });
        await toggleTask(task.id, newStatus);
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        await deleteTask(task.id);
    };

    if (isDeleting) return null;

    return (
        <Paper
            elevation={0}
            component="li"
            sx={{
                p: 0,
                borderRadius: 3,
                border: '1px solid',
                borderColor: optimisticTask.is_completed ? 'transparent' : 'rgba(0,0,0,0.06)',
                bgcolor: optimisticTask.is_completed ? 'action.hover' : 'background.paper',
                transition: 'all 0.2s',
                '&:hover': {
                    borderColor: 'primary.light',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                },
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden'
            }}
        >
            <Checkbox
                checked={optimisticTask.is_completed}
                onChange={handleToggle}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon />}
                sx={{
                    p: 2,
                    color: 'text.disabled',
                    '&.Mui-checked': {
                        color: 'success.main',
                    }
                }}
            />
            <Typography
                variant="body1"
                sx={{
                    flexGrow: 1,
                    py: 2,
                    textDecoration: optimisticTask.is_completed ? 'line-through' : 'none',
                    color: optimisticTask.is_completed ? 'text.disabled' : 'text.primary',
                    fontWeight: 500
                }}
            >
                {task.title}
            </Typography>
            <IconButton
                onClick={handleDelete}
                aria-label="delete"
                sx={{
                    mr: 1,
                    color: 'text.disabled',
                    '&:hover': {
                        color: 'error.main',
                        bgcolor: 'rgba(211, 47, 47, 0.04)'
                    }
                }}
            >
                <DeleteOutlineIcon />
            </IconButton>
        </Paper>
    );
}
