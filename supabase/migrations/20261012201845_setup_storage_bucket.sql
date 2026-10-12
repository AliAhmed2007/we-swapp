CREATE POLICY "Authenticated users can upload" ON "storage"."objects"
  FOR INSERT
  TO "authenticated"
  WITH CHECK ((bucket_id = 'listing-images'::text));

CREATE POLICY "Public read access" ON "storage"."objects"
  FOR SELECT
  TO PUBLIC
  USING ((bucket_id = 'listing-images'::text));

CREATE POLICY "Users can delete their own images" ON "storage"."objects"
  FOR DELETE
  TO "authenticated"
  USING ((bucket_id = 'listing-images'::text));

