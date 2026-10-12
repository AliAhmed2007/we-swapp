"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ROUTES } from '@/lib/constants';
import { fadeInUpVariants, staggerContainerVariants, buttonTapProps } from '@/lib/animations';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image - Full Viewport Height */}
      <section className="relative overflow-hidden h-screen">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/landingbg-image.jpg"
            alt="We-Swap Campus Background"
            fill
            priority
            quality={100}
            className="object-cover"
            sizes="100vw"
          />
          {/* Gradient Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-slate-50/90 to-primary-mint/20" />
        </div>

        {/* Hero Content - Centered */}
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
          <motion.div 
            className="max-w-4xl mx-auto space-y-8 text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
          >
            {/* Logo */}
            <motion.div variants={fadeInUpVariants} className="flex justify-center">
              <motion.div 
                className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img
                  src="/weswap-icon.jpeg"
                  alt="We-Swap"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              variants={fadeInUpVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              <span className="text-foreground">Reuse More.</span>
              <br />
              <span className="bg-gradient-to-r from-primary-mint to-primary-emerald bg-clip-text text-transparent">
                Waste Less. Share Better.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              variants={fadeInUpVariants}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
            >
              Your campus exchange community. Buy, sell, donate, or swap items with fellow students.
              Zero shipping, zero waste, all local.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={fadeInUpVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            >
              <motion.div {...buttonTapProps}>
                <Link
                  href={ROUTES.BROWSE}
                  className="px-8 py-4 text-lg font-semibold text-primary-foreground bg-gradient-to-r from-primary-mint to-primary-emerald rounded-lg hover:opacity-90 transition-opacity shadow-lg"
                >
                  Browse Listings
                </Link>
              </motion.div>
              <motion.div {...buttonTapProps}>
                <Link
                  href="/register"
                  className="px-8 py-4 text-lg font-semibold border-2 border-border bg-background/50 backdrop-blur-sm rounded-lg hover:bg-accent transition-colors"
                >
                  Sign Up Free
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 0.5 }}
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-sm font-medium">Scroll to explore</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Stats Section - Appears after scroll down */}
      <section className="bg-white py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="space-y-2 text-center"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary-mint">1,420+</div>
              <div className="text-sm md:text-base text-muted-foreground">Items Swapped</div>
            </motion.div>
            <motion.div 
              className="space-y-2 text-center"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary-mint">3.8T</div>
              <div className="text-sm md:text-base text-muted-foreground">Waste Diverted</div>
            </motion.div>
            <motion.div 
              className="space-y-2 text-center"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary-mint">$24K</div>
              <div className="text-sm md:text-base text-muted-foreground">Money Saved</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerVariants}
          >
            <motion.div 
              variants={fadeInUpVariants}
              whileHover={{ y: -4 }}
              className="bg-card border border-border rounded-xl p-8 space-y-4 shadow-sm"
            >
              <div className="w-12 h-12 bg-primary-mint/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-mint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Buy & Sell</h3>
              <p className="text-muted-foreground">
                List items for sale or find great deals from your classmates. Keep money in the community.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUpVariants}
              whileHover={{ y: -4 }}
              className="bg-card border border-border rounded-xl p-8 space-y-4 shadow-sm"
            >
              <div className="w-12 h-12 bg-primary-mint/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-mint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Swap Items</h3>
              <p className="text-muted-foreground">
                Trade directly with other students. Exchange textbooks, gear, and more without spending a dollar.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUpVariants}
              whileHover={{ y: -4 }}
              className="bg-card border border-border rounded-xl p-8 space-y-4 shadow-sm"
            >
              <div className="w-12 h-12 bg-primary-mint/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-mint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Donate & Give</h3>
              <p className="text-muted-foreground">
                Pay it forward by donating items you no longer need. Help fellow students save money.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sustainability Banner */}
      <section className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-gradient-to-r from-primary-mint to-primary-emerald rounded-2xl p-12 text-center text-white shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-4">
            Making Campus Sustainable, One Exchange at a Time
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Every item you reuse helps reduce waste and carbon emissions. Together, we&apos;re building a more sustainable future.
          </p>
          <motion.div {...buttonTapProps}>
            <Link
              href={ROUTES.IMPACT}
              className="inline-block px-8 py-4 bg-white text-primary-emerald font-semibold rounded-lg hover:bg-opacity-90 transition-opacity"
            >
              See Our Impact
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
