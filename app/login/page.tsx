'use client';

import { createBrowserSupabaseClient } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

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
            setError('Check your email to confirm your account!');
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-card rounded-2xl p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border/50">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Welcome Back
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your credentials to access your workspace
                    </p>
                </div>
                <form className="space-y-6 mt-8">
                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-foreground">
                                Email address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-input text-foreground border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm placeholder:text-muted-foreground text-base"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-foreground">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-input text-foreground border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm placeholder:text-muted-foreground text-base"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-4 bg-destructive/10 text-destructive text-sm rounded-xl border border-destructive/20 flex items-start gap-2">
                            <span className="mt-0.5 block w-2 h-2 rounded-full bg-destructive flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-4 pt-2">
                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="w-full px-4 py-3.5 text-base font-semibold text-primary-foreground bg-primary rounded-xl hover:bg-primary/90 transition-all shadow-[0_4px_14px_rgba(99,102,241,0.3)] disabled:opacity-50 flex justify-center items-center active:scale-[0.98]"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Log In'}
                        </button>
                        <button
                            onClick={handleSignUp}
                            disabled={loading}
                            className="w-full px-4 py-3.5 text-base font-semibold text-foreground bg-background border border-input hover:bg-accent hover:text-accent-foreground rounded-xl transition-all disabled:opacity-50 flex justify-center items-center active:scale-[0.98]"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
