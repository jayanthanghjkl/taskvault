
import { getTasks } from '@/actions/taskActions';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { createClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function DashboardPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const tasks = await getTasks();

    return (
        <div className="min-h-screen bg-background font-sans pb-20 sm:pb-0">
            {/* Header */}
            <header className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50 supports-[backdrop-filter]:bg-background/60">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold shadow-sm">
                            <Avatar className="h-9 w-9 border border-sidebar-border">
                                <AvatarImage src="" />
                                <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                                    {user?.email?.[0].toUpperCase() || "U"}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="flex items-center gap-2 px-2.5 py-1.5 bg-muted/50 rounded-sm border border-border/50 max-w-[140px] sm:max-w-none">
                            <span className="text-xs font-medium text-muted-foreground truncate">{user.email?.split('@')[0] || 'User'}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4">

                        <form action="/auth/signout" method="post">
                            <button
                                className="outline text-sm font-medium text-muted-foreground hover:text-destructive transition-colors p-2 sm:px-3 sm:py-2 rounded-sm hover:bg-destructive/10"
                                aria-label="Sign out"
                            >
                                <span className="hidden sm:inline">Sign out</span>
                                <span className="sm:hidden">Sign out</span>
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto py-6 sm:py-10 px-4 sm:px-6 space-y-6 sm:space-y-8">
                <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                        Today's Tasks
                    </h2>
                    <p className="text-muted-foreground text-base sm:text-lg">
                        Stay focused and organized.
                    </p>
                </div>

                <div className="bg-card rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-border p-4 sm:p-6 md:p-8">
                    <TaskForm />

                    <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border/50">
                        <div className="mb-4 sm:mb-6 flex items-center justify-between">
                            <h3 className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                Your List
                            </h3>
                            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                                {tasks?.length || 0} Tasks
                            </span>
                        </div>
                        <TaskList tasks={tasks || []} />
                        
                    </div>
                </div>
            </main>
        </div>
    );
}
