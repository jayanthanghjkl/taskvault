import { getTasks } from '@/actions/taskActions';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { createClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import LogoutIcon from '@mui/icons-material/Logout';

export default async function Dashboard() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const tasks = await getTasks();

    return (
        <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
            {/* Header */}
            <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid', borderColor: 'divider' }}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40, fontWeight: 'bold', boxShadow: '0 4px 10px rgba(98, 0, 234, 0.3)' }}>
                                {user?.email?.[0].toUpperCase() || "U"}
                            </Avatar>
                            <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column' }}>
                                <Typography variant="subtitle2" color="text.primary" fontWeight="bold">
                                    <span className="text-xs font-medium text-muted-foreground truncate">{user.email?.split('@')[0] || 'User'}</span>
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {user.email}
                                </Typography>
                            </Box>
                        </Box>

                        <form action="/auth/signout" method="post">
                            <Button
                                type="submit"
                                color="error"
                                startIcon={<LogoutIcon />}
                                sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2 }}
                            >
                                Sign out
                            </Button>
                        </form>
                    </Toolbar>
                </Container>
            </AppBar>

            <Container maxWidth="md" sx={{ py: 6 }}>
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Typography variant="h3" component="h1" fontWeight="800" gutterBottom sx={{
                        background: 'linear-gradient(45deg, #6200ea 30%, #00e5ff 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        pb: 1 // prevent clipping descenders
                    }}>
                        Today&apos;s Tasks
                    </Typography>
                    <Typography variant="h6" color="text.secondary" fontWeight="normal">
                        Stay focused and organized.
                    </Typography>
                </Box>

                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 2, md: 4 },
                        borderRadius: 4,
                        bgcolor: 'background.paper',
                        boxShadow: '0 10px 40px -10px rgba(0,0,0,0.08)',
                        border: '1px solid',
                        borderColor: 'divider'
                    }}
                >
                    <TaskForm />

                    <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid', borderColor: 'divider' }}>
                        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="overline" color="text.secondary" fontWeight="bold" fontSize="0.75rem" letterSpacing={1.5}>
                                YOUR LIST
                            </Typography>
                            <Box sx={{
                                px: 1.5,
                                py: 0.5,
                                borderRadius: 4,
                                bgcolor: 'primary.main',
                                color: 'white',
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                                boxShadow: '0 2px 8px rgba(98, 0, 234, 0.4)'
                            }}>
                                {tasks?.length || 0} Tasks
                            </Box>
                        </Box>
                        <Box sx={{ mb: 4, borderRadius: 3, p: 3, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
                            <TaskList tasks={tasks || []} />
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}
