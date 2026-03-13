'use client';

import { useState } from 'react';
import TaskItem from './TaskItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

type TaskPriority = 'Low' | 'Medium' | 'High';

type Task = {
    id: string;
    title: string;
    is_completed: boolean;
    priority: TaskPriority;
};

export default function TaskList({ tasks }: { tasks: Task[] }) {
    const [filter, setFilter] = useState<'All' | TaskPriority>('All');

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'All') return true;
        return task.priority === filter;
    });

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel id="filter-label">Filter</InputLabel>
                    <Select
                        labelId="filter-label"
                        value={filter}
                        label="Filter"
                        onChange={(e) => setFilter(e.target.value as any)}
                        sx={{ borderRadius: 2 }}
                    >
                        <MenuItem value="All">All Priorities</MenuItem>
                        <MenuItem value="Low">Low</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="High">High</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {filteredTasks.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <AssignmentIcon sx={{ fontSize: 48, opacity: 0.2 }} />
                    <Typography variant="body1">
                        {tasks.length === 0 ? "No tasks yet. Create one above!" : "No tasks found for this priority."}
                    </Typography>
                </Box>
            ) : (
                <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {filteredTasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </List>
            )}
        </Box>
    );
}
