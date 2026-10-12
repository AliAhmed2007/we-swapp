'use client';

import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

interface ImageUploaderProps {
  onImagesChange: (urls: string[]) => void;
  maxImages?: number;
}

export function ImageUploader({ onImagesChange, maxImages = 5 }: ImageUploaderProps) {
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = useCallback(async (file: File) => {
    try {
      const supabase = createClient();
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `listings/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('listing-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('listing-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (err) {
      console.error('Upload error:', err);
      throw err;
    }
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setError(null);
    setUploading(true);

    try {
      const files = Array.from(e.target.files);
      
      // Check if adding these files would exceed max
      if (images.length + files.length > maxImages) {
        setError(`You can only upload up to ${maxImages} images`);
        setUploading(false);
        return;
      }

      // Upload all files
      const uploadPromises = files.map(file => uploadImage(file));
      const uploadedUrls = await Promise.all(uploadPromises);

      const newImages = [...images, ...uploadedUrls];
      setImages(newImages);
      onImagesChange(newImages);
    } catch (err) {
      setError('Failed to upload images. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      <div>
        <label
          htmlFor="image-upload"
          className={`
            flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer
            ${uploading ? 'border-muted bg-muted/10' : 'border-border hover:bg-accent/50'}
            transition-colors
          `}
        >
          {uploading ? (
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Uploading...</p>
            </div>
          ) : (
            <div className="text-center">
              <svg
                className="w-10 h-10 mx-auto mb-2 text-muted-foreground"
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
              <p className="text-sm text-muted-foreground">
                Click to upload images ({images.length}/{maxImages})
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG, WEBP up to 5MB each
              </p>
            </div>
          )}
          <input
            id="image-upload"
            type="file"
            className="hidden"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            multiple
            onChange={handleFileChange}
            disabled={uploading || images.length >= maxImages}
          />
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((url, index) => (
            <div key={url} className="relative group aspect-square">
              <img
                src={url}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover rounded-lg border border-border"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg
                  className="w-4 h-4"
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
              </button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-primary text-primary-foreground text-xs rounded">
                  Cover
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
