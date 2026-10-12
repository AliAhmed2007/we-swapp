import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { NavbarClient } from './navbar-client';
import { createClient } from '@/lib/supabase/server';

const navLinks = [
  { href: ROUTES.BROWSE, label: 'Browse All' },
  { href: ROUTES.SWAP_HUB, label: 'Swap Hub' },
  { href: ROUTES.BUY_FREE, label: 'Buy & Free' },
  { href: ROUTES.IMPACT, label: 'Impact' },
];

export default async function Navbar() {
  let user = null;
  
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch (error) {
    console.error('Error fetching user:', error);
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-200">
              <img
                src="/weswap-icon.jpeg"
                alt="We-Swap"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:inline-block">
              We-Swap
            </span>
          </Link>

          {/* Client-side interactive parts */}
          <NavbarClient user={user} navLinks={navLinks} />
        </div>
      </div>
    </nav>
  );
}
