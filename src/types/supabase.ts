/**
 * Supabase Database Types
 * This file will be auto-generated once you run: npx supabase gen types typescript
 * For now, we provide a base structure
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          phone: string | null;
          campus_id: string | null;
          bio: string | null;
        };
        Insert: {
          id: string;
          created_at?: string;
          updated_at?: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          campus_id?: string | null;
          bio?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          campus_id?: string | null;
          bio?: string | null;
        };
      };
      listings: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          title: string;
          description: string;
          price: number;
          category: string;
          condition: string;
          listing_type: string;
          images: string[];
          user_id: string;
          meetup_zone_id: string;
          is_active: boolean;
          view_count: number;
          weight_kg: number | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          title: string;
          description: string;
          price: number;
          category: string;
          condition: string;
          listing_type: string;
          images?: string[];
          user_id: string;
          meetup_zone_id: string;
          is_active?: boolean;
          view_count?: number;
          weight_kg?: number | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          title?: string;
          description?: string;
          price?: number;
          category?: string;
          condition?: string;
          listing_type?: string;
          images?: string[];
          user_id?: string;
          meetup_zone_id?: string;
          is_active?: boolean;
          view_count?: number;
          weight_kg?: number | null;
        };
      };
      // Add more tables as needed
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
