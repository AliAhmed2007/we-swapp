'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';
import { UserNav } from './user-nav';
import type { User } from '@supabase/supabase-js';

interface NavbarClientProps {
  user: User | null;
  navLinks: Array<{ href: string; label: string }>;
}

export function NavbarClient({ user, navLinks }: NavbarClientProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-1">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200',
              isActiveLink(link.href)
                ? 'text-primary-mint bg-primary-mint/10'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Desktop Actions */}
      <div className="hidden md:flex items-center gap-3">
        {user && (
          <Link
            href={ROUTES.LISTINGS_CREATE}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary-mint to-primary-emerald rounded-md hover:opacity-90 transition-opacity duration-200 shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            List an Item
          </Link>
        )}

        <UserNav user={user} />
      </div>

      {/* Mobile Menu Button */}
      <button
        type="button"
        className="md:hidden p-2 rounded-md text-muted-foreground hover:bg-accent/50 transition-colors duration-200"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        {mobileMenuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 md:hidden py-4 border-b border-border bg-background shadow-lg">
          <div className="container mx-auto px-4 flex flex-col gap-2">
            {/* Mobile Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200',
                  isActiveLink(link.href)
                    ? 'text-primary-mint bg-primary-mint/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                )}
              >
                {link.label}
              </Link>
            ))}

            {user && (
              <Link
                href={ROUTES.LISTINGS_CREATE}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-primary-mint to-primary-emerald rounded-md hover:opacity-90 transition-opacity duration-200 shadow-sm mt-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                List an Item
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
