
import Link from 'next/link';
import { Layout, CheckCircle, Shield, Zap, Menu } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-md fixed w-full top-0 z-50 bg-background/80 supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layout className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">TaskVault</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-xl shadow-[0_4px_10px_rgba(99,102,241,0.2)] hover:bg-primary/90 transition-all hover:shadow-[0_6px_14px_rgba(99,102,241,0.3)] active:scale-95"
            >
              Get Started
            </Link>
          </div>

         
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] sm:leading-[1.1]">
              Manage tasks with <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">
                precision & focus
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
              Experience the next generation of task management. Built for speed, designed for clarity, and optimized for mobile activity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 w-full sm:w-auto">
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-primary rounded-xl shadow-[0_4px_14px_rgba(99,102,241,0.3)] hover:bg-primary/90 transition-all active:scale-[0.98] flex items-center justify-center min-h-[56px]"
              >
                Start for free
              </Link>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-foreground bg-white border border-border rounded-xl hover:bg-gray-50 transition-all active:scale-[0.98] flex items-center justify-center min-h-[56px]"
              >
                Go to Dashboard
              </Link>
            </div>

            <div className="pt-4 sm:pt-8 flex flex-row items-center justify-center lg:justify-start gap-4 sm:gap-8 text-sm text-muted-foreground/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Free forever</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span>Secure data</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span>Lightning fast</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative mt-8 lg:mt-0">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-purple-500/20 rounded-[2rem] blur-3xl opacity-50 -z-10" />
            <div className="bg-white/50 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl skew-y-1 transform transition-transform hover:skew-y-0 duration-700">
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                {/* Mock UI Header */}
                <div className="h-12 border-b border-gray-100 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                {/* Mock UI Content */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="h-8 w-1/3 bg-gray-100 rounded-lg animate-pulse" />
                  <div className="space-y-3 pt-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-gray-50 hover:border-indigo-50 hover:bg-indigo-50/10 transition-colors cursor-default">
                        <div className="w-6 h-6 rounded-full border-2 border-gray-200" />
                        <div className="h-4 w-2/3 bg-gray-50 rounded" />
                      </div>
                    ))}
                  </div>
                  {/* Mobile Thumb Zone Mockup */}
                  <div className="pt-4 flex justify-center lg:hidden">
                    <div className="h-1 bg-gray-200 w-1/3 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
