'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { signOut } from '@/features/auth/actions';
import type { User } from '@supabase/supabase-js';

interface UserNavProps {
  user: User | null;
}

export function UserNav({ user }: UserNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary-mint to-primary-emerald rounded-md hover:opacity-90 transition-opacity"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 rounded-full hover:bg-accent transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-mint to-primary-emerald flex items-center justify-center text-white text-sm font-medium">
          {initials}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-lg py-1 z-50">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-medium">{displayName}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>

          <Link
            href="/profile"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-accent transition-colors"
          >
            My Profile
          </Link>

          <Link
            href="/listings/mine"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-accent transition-colors"
          >
            My Listings
          </Link>

          <Link
            href="/chat"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-accent transition-colors"
          >
            Messages
          </Link>

          <div className="border-t border-border my-1" />

          <form action={signOut}>
            <button
              type="submit"
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-accent transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
