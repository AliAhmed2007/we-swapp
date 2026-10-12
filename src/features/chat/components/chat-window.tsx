'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { springSnappy } from '@/lib/animations';
import { sendMessage } from '../actions';

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string | null;
  sender: {
    full_name: string;
  } | null;
}

interface ChatWindowProps {
  conversationId: string;
  currentUserId: string;
  initialMessages: Message[];
}

export function ChatWindow({
  conversationId,
  currentUserId,
  initialMessages,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    
    if (!newMessage.trim() || sending) return;

    setSending(true);
    const messageText = newMessage.trim();
    setNewMessage('');

    const result = await sendMessage(conversationId, messageText);

    if (!result.error) {
      // Optimistically add message to UI
      const tempMessage: Message = {
        id: `temp-${Date.now()}`,
        content: messageText,
        sender_id: currentUserId,
        created_at: new Date().toISOString(),
        sender: { full_name: 'You' },
      };
      setMessages([...messages, tempMessage]);
    }

    setSending(false);
  }

  return (
    <div className="flex flex-col h-[600px] bg-card border-x border-b border-border rounded-b-lg shadow-sm">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((message) => {
            const isOwn = message.sender_id === currentUserId;
            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={springSnappy}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 shadow-sm ${
                    isOwn
                      ? 'bg-primary text-primary-foreground rounded-br-sm'
                      : 'bg-muted text-foreground border border-border rounded-bl-sm'
                  }`}
                >
                  {!isOwn && message.sender && (
                    <p className="text-xs opacity-70 mb-1">
                      {message.sender.full_name}
                    </p>
                  )}
                  <p className="whitespace-pre-wrap break-words">
                    {message.content}
                  </p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.created_at ? new Date(message.created_at).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    }) : ''}
                  </p>
                </div>
              </motion.div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="border-t border-border p-4 bg-background">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-ring"
            disabled={sending}
          />
          <motion.button
            type="submit"
            disabled={!newMessage.trim() || sending}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            {sending ? 'Sending...' : 'Send'}
          </motion.button>
        </div>
      </form>
    </div>
  );
}
