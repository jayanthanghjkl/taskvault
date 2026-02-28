'use client';

import { createBrowserSupabaseClient } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
// MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
// Icons
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createBrowserSupabaseClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.refresh();
            router.push('/dashboard');
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            setError('User created successfully!, click login to continue');
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper
                    elevation={6}
                    sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        borderRadius: 3,
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <Box
                        sx={{
                            m: 1,
                            bgcolor: 'secondary.main',
                            width: 50,
                            height: 50,
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                            mb: 2,
                            boxShadow: '0 4px 10px rgba(0,229,255, 0.4)'
                        }}
                    >
                        <LoginIcon fontSize="large" />
                    </Box>
                    <Typography component="h1" variant="h4" fontWeight="bold" gutterBottom color="primary">
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
                        Enter your credentials to access your workspace
                    </Typography>

                    <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                sx: { borderRadius: 2 }
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                sx: { borderRadius: 2 }
                            }}
                        />

                        {error && (
                            <Alert severity={error.includes('User created successfully!, click login to continue') ? "success" : "error"} sx={{ mt: 2, borderRadius: 2 }}>
                                {error}
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            onClick={handleLogin}
                            startIcon={!loading && <LoginIcon />}
                            sx={{ mt: 3, mb: 1, py: 1.5, borderRadius: 2, fontSize: '1rem' }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Log In'}
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            disabled={loading}
                            onClick={handleSignUp}
                            startIcon={!loading && <PersonAddIcon />}
                            sx={{ mt: 1, mb: 2, py: 1.5, borderRadius: 2, borderWidth: 2, '&:hover': { borderWidth: 2 } }}
                        >
                            Create Account
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}
