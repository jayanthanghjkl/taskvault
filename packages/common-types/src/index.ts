import { z } from 'zod';

export const taskSchema = z.object({
    title: z.string().min(1, 'Title is required').nonempty('Title cannot be empty'),
    priority: z.enum(['Low', 'Medium', 'High']).default('Medium'),
});

export type TaskInput = z.infer<typeof taskSchema>;
