'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function createListing(formData: FormData) {
  const supabase = await createClient();

  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: 'You must be logged in to create a listing' };
  }

  // Parse images
  const imagesJson = formData.get('images') as string;
  const images = JSON.parse(imagesJson);

  if (!images || images.length === 0) {
    return { error: 'Please upload at least one image' };
  }

  // Build listing data
  const listingData: {
    user_id: string;
    title: string;
    description: string;
    category_id: number;
    condition: 'NEW' | 'LIKE_NEW' | 'GOOD' | 'USED';
    listing_type: 'SELL' | 'DONATE' | 'SWAP';
    price: number;
    swap_preference: string | null;
    images: string[];
    campus_spot: string;
    status: 'AVAILABLE';
  } = {
    user_id: user.id,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    category_id: parseInt(formData.get('category_id') as string),
    condition: formData.get('condition') as 'NEW' | 'LIKE_NEW' | 'GOOD' | 'USED',
    listing_type: formData.get('listing_type') as 'SELL' | 'DONATE' | 'SWAP',
    price: formData.get('listing_type') === 'DONATE' ? 0 : parseFloat(formData.get('price') as string || '0'),
    swap_preference: formData.get('swap_preference') as string || null,
    images: images,
    campus_spot: formData.get('campus_spot') as string,
    status: 'AVAILABLE',
  };

  // Insert listing
  const { data, error } = await supabase
    .from('listings')
    .insert(listingData)
    .select()
    .single();

  if (error) {
    console.error('Error creating listing:', error);
    return { error: 'Failed to create listing. Please try again.' };
  }

  revalidatePath('/browse');
  redirect('/browse');
}

export async function getListings(filters?: {
  type?: 'SELL' | 'DONATE' | 'SWAP';
  category?: number;
  search?: string;
}) {
  const supabase = await createClient();

  let query = supabase
    .from('listings')
    .select(`
      *,
      profiles (
        full_name,
        university_email
      ),
      categories (
        name,
        slug
      )
    `)
    .eq('status', 'AVAILABLE')
    .order('created_at', { ascending: false });

  if (filters?.type) {
    query = query.eq('listing_type', filters.type);
  }

  if (filters?.category) {
    query = query.eq('category_id', filters.category);
  }

  if (filters?.search) {
    query = query.ilike('title', `%${filters.search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching listings:', error);
    return { listings: [], error: error.message };
  }

  return { listings: data || [], error: null };
}

export async function getListing(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('listings')
    .select(`
      *,
      profiles (
        full_name,
        university_email,
        campus_location
      ),
      categories (
        name,
        slug
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching listing:', error);
    return { listing: null, error: error.message };
  }

  return { listing: data, error: null };
}

/**
 * Mark a listing as completed - triggers sustainability impact logging
 */
export async function markListingCompleted(listingId: string) {
  const supabase = await createClient();

  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { success: false, error: 'You must be logged in' };
  }

  // Verify user owns the listing
  const { data: listing } = await supabase
    .from('listings')
    .select('user_id')
    .eq('id', listingId)
    .single();

  if (!listing || listing.user_id !== user.id) {
    return { success: false, error: 'Not authorized' };
  }

  // Update listing status to COMPLETED - this will trigger the sustainability impact log
  const { error } = await supabase
    .from('listings')
    .update({ status: 'COMPLETED', updated_at: new Date().toISOString() })
    .eq('id', listingId);

  if (error) {
    console.error('Error marking listing as completed:', error);
    return { success: false, error: 'Failed to update listing' };
  }

  revalidatePath('/browse');
  revalidatePath('/impact');
  return { success: true };
}
