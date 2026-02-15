'use client';

import Link from 'next/link';
import { Layout, CheckCircle, Shield, Zap } from 'lucide-react';

// MUI Imports
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'; // Grid version 2 is usually preferred in new projects but v1 is stable. Using v1 (Grid) for simplicity as v2 is Grid2
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';

import { email } from 'zod';

export default function Home() {
  const user = { email: 'demo@taskvault.com' };
  const tasks = [
    { id: 1, title: 'Review project proposal', completed: false },
    { id: 2, title: 'Team meeting at 2 PM', completed: true },
    { id: 3, title: 'Update documentation', completed: false },
  ];
  const newTask = '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const setNewTask = (val: string) => { };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addTask = (e: any) => e.preventDefault();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const deleteTask = (id: number) => { };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const toggleTask = (id: number) => { };


  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      {/* Navigation */}
      <AppBar position="fixed" elevation={0} sx={{ bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Layout color="#6200ea" />
              <Typography variant="h6" fontWeight="bold" color="text.primary">
                TaskVault
              </Typography>
            </Box>

            {/* Desktop Nav */}
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2, alignItems: 'center' }}>
              <Button component={Link} href="/login" color="inherit" sx={{ fontWeight: 600 }}>
                Sign In
              </Button>
              <Button
                component={Link}
                href="/login"
                variant="contained"
                sx={{
                  borderRadius: 3,
                  px: 3,
                  py: 1,
                  boxShadow: '0 4px 14px 0 rgba(98, 0, 234, 0.3)'
                }}
              >
                Get Started
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="lg" component="main" sx={{ pt: 18, pb: 10 }}>
        <Grid container spacing={8} alignItems="center">
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box sx={{ textAlign: { xs: 'center', lg: 'left' } }}>
              <Typography
                variant="h1"
                fontWeight="800"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3.5rem', lg: '4.5rem' },
                  lineHeight: 1.1,
                  mb: 3
                }}
              >
                Manage tasks with{' '}
                <Box component="span" sx={{
                  background: 'linear-gradient(45deg, #6200ea 30%, #00e5ff 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}>
                  precision & focus
                </Box>
              </Typography>

              <Typography variant="h6" color="text.secondary" sx={{ mb: 6, fontWeight: 'normal', lineHeight: 1.6, maxWidth: 600, mx: { xs: 'auto', lg: 0 } }}>
                Experience the next generation of task management. Built for speed, designed for clarity, and optimized for mobile activity.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', lg: 'flex-start' }, flexDirection: { xs: 'column', sm: 'row' } }}>
                <Button
                  component={Link}
                  href="/login"
                  variant="contained"
                  size="large"
                  sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    boxShadow: '0 6px 20px rgba(98, 0, 234, 0.4)'
                  }}
                >
                  Start for free
                </Button>
                <Button
                  component={Link}
                  href="/dashboard"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    borderWidth: 2,
                    borderColor: 'divider',
                    color: 'text.primary',
                    '&:hover': {
                      borderWidth: 2,
                      borderColor: 'primary.main',
                      bgcolor: 'transparent'
                    }
                  }}
                >
                  Go to Dashboard
                </Button>
              </Box>

              <Box sx={{ mt: 6, display: 'flex', gap: 4, justifyContent: { xs: 'center', lg: 'flex-start' }, color: 'text.secondary' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle size={20} color="#6200ea" />
                  <Typography variant="body2" fontWeight="medium">Free forever</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Shield size={20} color="#6200ea" />
                  <Typography variant="body2" fontWeight="medium">Secure data</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Zap size={20} color="#6200ea" />
                  <Typography variant="body2" fontWeight="medium">Lightning fast</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }} sx={{ display: { xs: 'none', lg: 'block' } }}>
            <Box sx={{ position: 'relative' }}>
              <Box sx={{
                position: 'absolute',
                inset: -20,
                background: 'linear-gradient(to top right, rgba(98, 0, 234, 0.2), rgba(0, 229, 255, 0.2))',
                filter: 'blur(40px)',
                zIndex: -1,
                borderRadius: '50%'
              }} />
              <Paper
                elevation={6}
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.8)',
                  transform: { lg: 'perspective(1000px) rotateY(-5deg) rotateX(2deg)' },
                  transition: 'transform 0.5s ease',
                  '&:hover': {
                    transform: { lg: 'perspective(1000px) rotateY(0deg) rotateX(0deg)' }
                  }
                }}
              >
                {/* Mock UI Header */}
                <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#f8f9fa' }}>
                  {/* Header */}
                  <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Container maxWidth="lg">
                      <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40, fontWeight: 'bold' }}>
                            {user.email[0].toUpperCase()}
                          </Avatar>
                          <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column' }}>
                            <Typography variant="subtitle2" color="text.primary" fontWeight="bold">
                              {user.email.split('@')[0]}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {user.email}
                            </Typography>
                          </Box>
                        </Box>
                        <Button color="error" startIcon={<LogoutIcon />} sx={{ textTransform: 'none' }}>
                          Sign out
                        </Button>
                      </Toolbar>
                    </Container>
                  </AppBar>

                  <Container maxWidth="md" sx={{ py: 6 }}>
                    <Box sx={{ mb: 6, textAlign: 'center', display: { xs: 'none', md: 'block' } }}>
                      <Typography variant="h3" fontWeight="800" sx={{
                        background: 'linear-gradient(45deg, #6200ea 30%, #00e5ff 90%)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', pb: 1
                      }}>
                        Today's Tasks
                      </Typography>
                    </Box>

                    <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>

                      {/* Inline TaskForm Mockup */}
                      <Box component="form" onSubmit={addTask} sx={{ display: 'flex', gap: 2, mb: 4 }}>
                        <TextField
                          fullWidth
                          placeholder="What needs to be done?"
                          value={newTask}
                          onChange={(e) => setNewTask(e.target.value)}
                          variant="outlined"
                        />
                        <Button type="submit" variant="contained" sx={{ px: 4, borderRadius: 2 }}>Add</Button>
                      </Box>

                      <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 4 }}>
                        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="overline" color="text.secondary" fontWeight="bold">YOUR LIST</Typography>
                          <Box sx={{ px: 1.5, py: 0.5, borderRadius: 4, bgcolor: 'primary.main', color: 'white', fontSize: '0.75rem', fontWeight: 'bold' }}>
                            {tasks.length} Tasks
                          </Box>
                        </Box>

                        {/* Inline TaskList Mockup */}
                        <List>
                          {tasks.map((task) => (
                            <ListItem
                              key={task.id}
                              sx={{ bgcolor: 'background.paper', mb: 1, borderRadius: 2, border: '1px solid #eee' }}
                              secondaryAction={
                                <IconButton edge="end" onClick={() => deleteTask(task.id)} color="error">
                                  <DeleteIcon />
                                </IconButton>
                              }
                            >
                              <Checkbox checked={task.completed} onChange={() => toggleTask(task.id)} />
                              <ListItemText
                                primary={task.title}
                                sx={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'text.secondary' : 'text.primary' }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </Paper>
                  </Container>
                </Box>

              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
