'use client';

import { createTask } from '@/actions/taskActions';
import { useActionState } from 'react';
import { useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const initialState = {
    error: null as string | null,
    success: false,
};

export default function TaskForm() {
    const [state, formAction, isPending] = useActionState(createTask, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.success && formRef.current) {
            formRef.current.reset();
        }
    }, [state.success]);

    return (
        <Box component="form" action={formAction} ref={formRef} sx={{ mb: 4, borderRadius: 3, p: 3, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    name="title"
                    placeholder="What needs to be done?"
                    required
                    disabled={isPending}
                    InputProps={{
                        sx: {
                            bgcolor: 'white',
                            borderRadius: 3,
                            '& fieldset': { borderColor: 'rgba(0,0,0,0.08)' },
                            '&:hover fieldset': { borderColor: 'primary.main' },
                        }
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    disabled={isPending}
                    startIcon={!isPending && <AddCircleOutlineIcon />}
                    sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        whiteSpace: 'nowrap',
                        boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)',
                        fontWeight: 'bold',
                        fontSize: '1rem'
                    }}
                >
                    {isPending ? <CircularProgress size={24} color="inherit" /> : 'Add Task'}
                </Button>
            </Box>
            {state.error && (
                <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
                    {state.error}
                </Alert>
            )}
        </Box>
    );
}
