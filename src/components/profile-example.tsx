'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/types/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

export function ProfileExample() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProfiles(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchProfiles();
  }, []);

  if (loading) {
    return (
      <div className="p-4">
        <p className="text-gray-600">Loading profiles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Profiles</h2>
      {profiles.length === 0 ? (
        <p className="text-gray-600">No profiles found.</p>
      ) : (
        <div className="space-y-4">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold">@{profile.username}</h3>
              {profile.full_name && (
                <p className="text-gray-700">{profile.full_name}</p>
              )}
              {profile.bio && (
                <p className="text-gray-600 mt-2">{profile.bio}</p>
              )}
              <p className="text-xs text-gray-400 mt-2">
                Created: {new Date(profile.created_at!).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
