/**
 * Supabase Browser Client
 * Use this client in Client Components (components with 'use client' directive)
 */

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/supabase';

let client: ReturnType<typeof createBrowserClient<Database>> | null = null;

/**
 * Get or create a singleton Supabase browser client
 * This ensures we only create one client instance per browser session
 */
export function createClient() {
  if (client) {
    return client;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. Please check your .env.local file.'
    );
  }

  client = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);

  return client;
}

/**
 * Reset the client singleton (useful for testing or when switching accounts)
 */
export function resetClient() {
  client = null;
}
