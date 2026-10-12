'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function startConversation(listingId: string, sellerId: string) {
  const supabase = await createClient();

  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: 'You must be logged in to start a conversation' };
  }

  // Check if conversation already exists
  const { data: existing } = await supabase
    .from('conversations')
    .select('id')
    .eq('listing_id', listingId)
    .eq('buyer_id', user.id)
    .eq('seller_id', sellerId)
    .single();

  if (existing) {
    redirect(`/chat/${existing.id}`);
  }

  // Create new conversation
  const { data, error } = await supabase
    .from('conversations')
    .insert({
      listing_id: listingId,
      buyer_id: user.id,
      seller_id: sellerId,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating conversation:', error);
    return { error: 'Failed to start conversation. Please try again.' };
  }

  revalidatePath('/chat');
  redirect(`/chat/${data.id}`);
}

export async function sendMessage(conversationId: string, content: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: 'You must be logged in to send messages' };
  }

  const { error } = await supabase
    .from('messages')
    .insert({
      conversation_id: conversationId,
      sender_id: user.id,
      content: content.trim(),
    });

  if (error) {
    console.error('Error sending message:', error);
    return { error: 'Failed to send message. Please try again.' };
  }

  revalidatePath(`/chat/${conversationId}`);
  return { success: true };
}

export async function getConversations() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { conversations: [], error: 'Not authenticated' };
  }

  const { data, error } = await supabase
    .from('conversations')
    .select(`
      *,
      listings (
        id,
        title,
        images,
        listing_type,
        price
      ),
      buyer:profiles!conversations_buyer_id_fkey (
        full_name
      ),
      seller:profiles!conversations_seller_id_fkey (
        full_name
      )
    `)
    .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching conversations:', error);
    return { conversations: [], error: error.message };
  }

  return { conversations: data || [], error: null };
}

export async function getConversation(conversationId: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { conversation: null, messages: [], error: 'Not authenticated' };
  }

  // Get conversation with listing and participant details
  const { data: conversation, error: convError } = await supabase
    .from('conversations')
    .select(`
      *,
      listings (
        id,
        title,
        images,
        price,
        listing_type,
        campus_spot
      ),
      buyer:profiles!conversations_buyer_id_fkey (
        full_name,
        university_email
      ),
      seller:profiles!conversations_seller_id_fkey (
        full_name,
        university_email
      )
    `)
    .eq('id', conversationId)
    .single();

  if (convError) {
    return { conversation: null, messages: [], error: convError.message };
  }

  // Verify user is part of this conversation
  if (conversation.buyer_id !== user.id && conversation.seller_id !== user.id) {
    return { conversation: null, messages: [], error: 'Unauthorized' };
  }

  // Get messages
  const { data: messages, error: msgError } = await supabase
    .from('messages')
    .select(`
      *,
      sender:profiles!messages_sender_id_fkey (
        full_name
      )
    `)
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  if (msgError) {
    console.error('Error fetching messages:', msgError);
  }

  return {
    conversation,
    messages: messages || [],
    error: null,
  };
}
