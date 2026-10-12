'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signUp } from '../actions';

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    // Validate password match
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm_password') as string;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const result = await signUp(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">Create your account</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Join your campus exchange community
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
            <label htmlFor="full_name" className="block text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              id="full_name"
              name="full_name"
              type="text"
              required
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="John Doe"
            />
          </div>

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
            <p className="mt-1 text-xs text-muted-foreground">
              Use your official university email address
            </p>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              At least 6 characters
            </p>
          </div>

          <div>
            <label htmlFor="confirm_password" className="block text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              id="confirm_password"
              name="confirm_password"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
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
          {loading ? 'Creating account...' : 'Create Account'}
        </button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary-mint hover:text-primary-emerald">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
