import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-canvas-dark dark:to-surface-dark">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/weswap-icon.jpeg"
                alt="We-Swap"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            <span className="text-foreground">Reuse More.</span>
            <br />
            <span className="bg-gradient-to-r from-primary-mint to-primary-emerald bg-clip-text text-transparent">
              Waste Less. Share Better.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your campus exchange community. Buy, sell, donate, or swap items with fellow students.
            Zero shipping, zero waste, all local.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link
              href={ROUTES.BROWSE}
              className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-mint to-primary-emerald rounded-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              Browse Listings
            </Link>
            <Link
              href="/register"
              className="px-8 py-4 text-lg font-semibold border-2 border-border rounded-lg hover:bg-accent transition-colors"
            >
              Sign Up Free
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary-mint">1,420+</div>
              <div className="text-sm text-muted-foreground">Items Swapped</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary-mint">3.8T</div>
              <div className="text-sm text-muted-foreground">Waste Diverted</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary-mint">$24K</div>
              <div className="text-sm text-muted-foreground">Money Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-8 space-y-4">
            <div className="w-12 h-12 bg-primary-mint/10 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-mint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Buy & Sell</h3>
            <p className="text-muted-foreground">
              List items for sale or find great deals from your classmates. Keep money in the community.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 space-y-4">
            <div className="w-12 h-12 bg-primary-mint/10 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-mint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Swap Items</h3>
            <p className="text-muted-foreground">
              Trade directly with other students. Exchange textbooks, gear, and more without spending a dollar.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 space-y-4">
            <div className="w-12 h-12 bg-primary-mint/10 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-mint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Donate & Give</h3>
            <p className="text-muted-foreground">
              Pay it forward by donating items you no longer need. Help fellow students save money.
            </p>
          </div>
        </div>
      </section>

      {/* Sustainability Banner */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary-mint to-primary-emerald rounded-2xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Making Campus Sustainable, One Exchange at a Time
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Every item you reuse helps reduce waste and carbon emissions. Together, we&apos;re building a more sustainable future.
          </p>
          <Link
            href={ROUTES.IMPACT}
            className="inline-block px-8 py-4 bg-white text-primary-emerald font-semibold rounded-lg hover:bg-opacity-90 transition-opacity"
          >
            See Our Impact
          </Link>
        </div>
      </section>
    </div>
  );
}
