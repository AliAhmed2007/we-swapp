'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signIn } from '../actions';

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    
    const result = await signIn(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to your We-Swap account
        </p>
      </div>

      <form action={handleSubmit} className="mt-8 space-y-6">
        {error && (
          <div className="rounded-lg bg-red-50 dark:bg-red-900/10 p-4 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              University Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="you@university.edu"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 text-white font-semibold bg-gradient-to-r from-primary-mint to-primary-emerald rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link href="/register" className="font-medium text-primary-mint hover:text-primary-emerald">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
