DROP INDEX "public"."idx_profiles_user_id";

DROP INDEX "public"."idx_profiles_username";

ALTER TABLE "public"."profiles"
  DROP CONSTRAINT "profiles_user_id_fkey";

ALTER TABLE "public"."profiles"
  DROP CONSTRAINT "profiles_username_key";

ALTER TABLE "public"."profiles"
  ALTER COLUMN "id" DROP DEFAULT;

ALTER TABLE "public"."profiles"
  DROP COLUMN "bio";

ALTER TABLE "public"."profiles"
  DROP COLUMN "user_id";

ALTER TABLE "public"."profiles"
  DROP COLUMN "username";

CREATE SEQUENCE "public"."categories_id_seq" AS integer INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1 NO CYCLE;

CREATE TABLE "public"."categories" (
  "id"            integer       NOT NULL DEFAULT nextval('public.categories_id_seq'::regclass),
  "name"          text          NOT NULL,
  "slug"          text          NOT NULL,
  "avg_weight_kg" numeric(6,2)  DEFAULT 1.00,
  "avg_value_usd" numeric(10,2) DEFAULT 15.00,
  CONSTRAINT "categories_name_key" UNIQUE (name),
  CONSTRAINT "categories_pkey" PRIMARY KEY (id),
  CONSTRAINT "categories_slug_key" UNIQUE (slug)
);

CREATE TABLE "public"."conversations" (
  "id"         uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "listing_id" uuid,
  "buyer_id"   uuid                     NOT NULL,
  "seller_id"  uuid                     NOT NULL,
  "created_at" timestamp with time zone DEFAULT now(),
  CONSTRAINT "conversations_pkey" PRIMARY KEY (id),
  CONSTRAINT "unique_listing_conversation" UNIQUE (listing_id, buyer_id, seller_id)
);

CREATE TABLE "public"."listing_reports" (
  "id"          uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "listing_id"  uuid                     NOT NULL,
  "reporter_id" uuid                     NOT NULL,
  "reason"      text                     NOT NULL,
  "status"      text                     DEFAULT 'PENDING'::text,
  "created_at"  timestamp with time zone DEFAULT now(),
  CONSTRAINT "listing_reports_pkey" PRIMARY KEY (id)
);

CREATE TABLE "public"."listings" (
  "id"              uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "user_id"         uuid                     NOT NULL,
  "category_id"     integer                  NOT NULL,
  "title"           text                     NOT NULL,
  "description"     text                     NOT NULL,
  "price"           numeric(10,2)            DEFAULT 0.00,
  "swap_preference" text,
  "images"          text[]                   NOT NULL DEFAULT '{}'::text[],
  "campus_spot"     text                     NOT NULL DEFAULT 'Campus Library Lobby'::text,
  "views_count"     integer                  DEFAULT 0,
  "created_at"      timestamp with time zone DEFAULT now(),
  "updated_at"      timestamp with time zone DEFAULT now(),
  CONSTRAINT "listings_pkey" PRIMARY KEY (id)
);

CREATE TABLE "public"."messages" (
  "id"              uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "conversation_id" uuid                     NOT NULL,
  "sender_id"       uuid                     NOT NULL,
  "content"         text                     NOT NULL,
  "created_at"      timestamp with time zone DEFAULT now(),
  CONSTRAINT "messages_pkey" PRIMARY KEY (id)
);

CREATE TABLE "public"."transaction_impact_logs" (
  "id"                    uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "listing_id"            uuid,
  "seller_id"             uuid,
  "category_id"           integer,
  "waste_diverted_kg"     numeric(6,2)             NOT NULL,
  "money_saved_estimated" numeric(10,2)            NOT NULL,
  "completed_at"          timestamp with time zone DEFAULT now(),
  CONSTRAINT "transaction_impact_logs_pkey" PRIMARY KEY (id)
);

ALTER SEQUENCE "public"."categories_id_seq" OWNED BY "public"."categories"."id";

ALTER TABLE "public"."profiles"
  ADD COLUMN "avatar_url" text;

ALTER TABLE "public"."profiles"
  ADD COLUMN "university_email" text NOT NULL;

ALTER TABLE "public"."profiles"
  ADD COLUMN "phone_number" text;

ALTER TABLE "public"."profiles"
  ADD COLUMN "campus_location" text;

ALTER TABLE "public"."profiles"
  ALTER COLUMN "full_name" SET NOT NULL;

CREATE TYPE "public"."listing_condition" AS ENUM (
  'NEW',
  'LIKE_NEW',
  'GOOD',
  'USED'
);

ALTER TABLE "public"."listings"
  ADD COLUMN "condition" public.listing_condition NOT NULL;

CREATE TYPE "public"."listing_status" AS ENUM (
  'AVAILABLE',
  'RESERVED',
  'COMPLETED',
  'ARCHIVED'
);

ALTER TABLE "public"."listings"
  ADD COLUMN "status" public.listing_status DEFAULT 'AVAILABLE'::public.listing_status;

CREATE TYPE "public"."listing_type" AS ENUM (
  'SELL',
  'DONATE',
  'SWAP'
);

ALTER TABLE "public"."listings"
  ADD COLUMN "listing_type" public.listing_type NOT NULL;

ALTER TABLE "public"."transaction_impact_logs"
  ADD COLUMN "transaction_type" public.listing_type NOT NULL;

ALTER TABLE "public"."conversations"
  ADD CONSTRAINT "conversations_buyer_id_fkey" FOREIGN KEY (buyer_id) REFERENCES public.profiles(id);

ALTER TABLE "public"."conversations"
  ADD CONSTRAINT "conversations_seller_id_fkey" FOREIGN KEY (seller_id) REFERENCES public.profiles(id);

ALTER TABLE "public"."listing_reports"
  ADD CONSTRAINT "listing_reports_reporter_id_fkey" FOREIGN KEY (reporter_id) REFERENCES public.profiles(id);

ALTER TABLE "public"."listings"
  ADD CONSTRAINT "listings_category_id_fkey" FOREIGN KEY (category_id) REFERENCES public.categories(id);

ALTER TABLE "public"."conversations"
  ADD CONSTRAINT "conversations_listing_id_fkey" FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE SET NULL;

ALTER TABLE "public"."listing_reports"
  ADD CONSTRAINT "listing_reports_listing_id_fkey" FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE CASCADE;

ALTER TABLE "public"."listings"
  ADD CONSTRAINT "listings_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

ALTER TABLE "public"."messages"
  ADD CONSTRAINT "messages_conversation_id_fkey" FOREIGN KEY (conversation_id) REFERENCES public.conversations(id) ON DELETE CASCADE;

ALTER TABLE "public"."messages"
  ADD CONSTRAINT "messages_sender_id_fkey" FOREIGN KEY (sender_id) REFERENCES public.profiles(id);

ALTER TABLE "public"."profiles"
  ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE "public"."profiles"
  ADD CONSTRAINT "profiles_university_email_key" UNIQUE (university_email);

ALTER TABLE "public"."transaction_impact_logs"
  ADD CONSTRAINT "transaction_impact_logs_category_id_fkey" FOREIGN KEY (category_id) REFERENCES public.categories(id);

ALTER TABLE "public"."transaction_impact_logs"
  ADD CONSTRAINT "transaction_impact_logs_listing_id_fkey" FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE SET NULL;

ALTER TABLE "public"."transaction_impact_logs"
  ADD CONSTRAINT "transaction_impact_logs_seller_id_fkey" FOREIGN KEY (seller_id) REFERENCES public.profiles(id);

CREATE INDEX idx_conversations_buyer_id ON public.conversations USING btree (buyer_id);

CREATE INDEX idx_conversations_seller_id ON public.conversations USING btree (seller_id);

CREATE INDEX idx_listings_category_id ON public.listings USING btree (category_id);

CREATE INDEX idx_listings_status ON public.listings USING btree (status);

CREATE INDEX idx_listings_type ON public.listings USING btree (listing_type);

CREATE INDEX idx_listings_user_id ON public.listings USING btree (user_id);

CREATE INDEX idx_messages_conversation_id ON public.messages USING btree (conversation_id);

CREATE INDEX idx_messages_created_at ON public.messages USING btree (created_at);

ALTER PUBLICATION "supabase_realtime" ADD TABLE "public"."messages";

GRANT SELECT, UPDATE, USAGE ON SEQUENCE "public"."categories_id_seq" TO "anon", "authenticated";

REVOKE ALL ON SEQUENCE "public"."categories_id_seq" FROM "postgres";

GRANT SELECT, UPDATE, USAGE ON SEQUENCE "public"."categories_id_seq" TO "postgres";

GRANT SELECT, UPDATE, USAGE ON SEQUENCE "public"."categories_id_seq" TO "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."categories" TO "anon", "authenticated";

REVOKE ALL ON TABLE "public"."categories" FROM "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."categories" TO "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."categories" TO "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."conversations" TO "anon", "authenticated";

REVOKE ALL ON TABLE "public"."conversations" FROM "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."conversations" TO "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."conversations" TO "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."listing_reports" TO "anon", "authenticated";

REVOKE ALL ON TABLE "public"."listing_reports" FROM "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."listing_reports" TO "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."listing_reports" TO "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."listings" TO "anon", "authenticated";

REVOKE ALL ON TABLE "public"."listings" FROM "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."listings" TO "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."listings" TO "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."messages" TO "anon", "authenticated";

REVOKE ALL ON TABLE "public"."messages" FROM "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."messages" TO "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."messages" TO "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."transaction_impact_logs" TO "anon", "authenticated";

REVOKE ALL ON TABLE "public"."transaction_impact_logs" FROM "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."transaction_impact_logs" TO "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."transaction_impact_logs" TO "service_role";

