import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_users_role" AS ENUM('admin', 'apartment-manager');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_version_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_listings_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__listings_v_version_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_locations_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__locations_v_version_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_companies_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__companies_v_version_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" "enum_users_role",
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric,
	"lock_until" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "users_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"companies_id" integer
);

CREATE TABLE IF NOT EXISTS "pages_blocks_content_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"content" jsonb,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_header_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"header" varchar,
	"show_search" boolean,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_media_block_images" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "pages_blocks_media_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"content" jsonb,
	"button_button_text" varchar,
	"button_external_link" boolean,
	"button_url" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"slug" varchar,
	"published_at" timestamp(3) with time zone,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "enum_pages_status"
);

CREATE TABLE IF NOT EXISTS "pages_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer,
	"pages_id" integer,
	"listings_id" integer
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_content_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"content" jsonb,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_header_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"header" varchar,
	"show_search" boolean,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_media_block_images" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_media_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"content" jsonb,
	"button_button_text" varchar,
	"button_external_link" boolean,
	"button_url" varchar,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"version_title" varchar,
	"version_slug" varchar,
	"version_published_at" timestamp(3) with time zone,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__pages_v_version_status",
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean
);

CREATE TABLE IF NOT EXISTS "_pages_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"pages_id" integer,
	"media_id" integer,
	"listings_id" integer
);

CREATE TABLE IF NOT EXISTS "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"alt" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric,
	"focal_x" numeric,
	"focal_y" numeric,
	"sizes_thumbnail_url" varchar,
	"sizes_thumbnail_width" numeric,
	"sizes_thumbnail_height" numeric,
	"sizes_thumbnail_mime_type" varchar,
	"sizes_thumbnail_filesize" numeric,
	"sizes_thumbnail_filename" varchar,
	"sizes_card_url" varchar,
	"sizes_card_width" numeric,
	"sizes_card_height" numeric,
	"sizes_card_mime_type" varchar,
	"sizes_card_filesize" numeric,
	"sizes_card_filename" varchar,
	"sizes_tablet_url" varchar,
	"sizes_tablet_width" numeric,
	"sizes_tablet_height" numeric,
	"sizes_tablet_mime_type" varchar,
	"sizes_tablet_filesize" numeric,
	"sizes_tablet_filename" varchar
);

CREATE TABLE IF NOT EXISTS "listings_blocks_content_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"content" jsonb,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "listings_blocks_header_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"header" varchar,
	"show_search" boolean,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "listings_blocks_media_block_images" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "listings_blocks_media_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"content" jsonb,
	"button_button_text" varchar,
	"button_external_link" boolean,
	"button_url" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "listings" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"slug" varchar,
	"published_at" timestamp(3) with time zone,
	"street" varchar,
	"city" varchar,
	"state" varchar,
	"zip" varchar,
	"latitude" varchar,
	"longitude" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "enum_listings_status"
);

CREATE TABLE IF NOT EXISTS "listings_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer,
	"companies_id" integer,
	"pages_id" integer,
	"listings_id" integer
);

CREATE TABLE IF NOT EXISTS "_listings_v_blocks_content_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"content" jsonb,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_listings_v_blocks_header_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"header" varchar,
	"show_search" boolean,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_listings_v_blocks_media_block_images" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_listings_v_blocks_media_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"content" jsonb,
	"button_button_text" varchar,
	"button_external_link" boolean,
	"button_url" varchar,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_listings_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"version_title" varchar,
	"version_slug" varchar,
	"version_published_at" timestamp(3) with time zone,
	"version_street" varchar,
	"version_city" varchar,
	"version_state" varchar,
	"version_zip" varchar,
	"version_latitude" varchar,
	"version_longitude" varchar,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__listings_v_version_status",
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean
);

CREATE TABLE IF NOT EXISTS "_listings_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"listings_id" integer,
	"media_id" integer,
	"companies_id" integer,
	"pages_id" integer
);

CREATE TABLE IF NOT EXISTS "locations_blocks_content_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"content" jsonb,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "locations_blocks_header_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"header" varchar,
	"show_search" boolean,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "locations_blocks_media_block_images" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "locations_blocks_media_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"content" jsonb,
	"button_button_text" varchar,
	"button_external_link" boolean,
	"button_url" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "locations" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"slug" varchar,
	"published_at" timestamp(3) with time zone,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "enum_locations_status"
);

CREATE TABLE IF NOT EXISTS "locations_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer,
	"pages_id" integer,
	"listings_id" integer
);

CREATE TABLE IF NOT EXISTS "_locations_v_blocks_content_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"content" jsonb,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_locations_v_blocks_header_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"header" varchar,
	"show_search" boolean,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_locations_v_blocks_media_block_images" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_locations_v_blocks_media_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"content" jsonb,
	"button_button_text" varchar,
	"button_external_link" boolean,
	"button_url" varchar,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_locations_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"version_title" varchar,
	"version_slug" varchar,
	"version_published_at" timestamp(3) with time zone,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__locations_v_version_status",
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean
);

CREATE TABLE IF NOT EXISTS "_locations_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"locations_id" integer,
	"media_id" integer,
	"pages_id" integer,
	"listings_id" integer
);

CREATE TABLE IF NOT EXISTS "companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"slug" varchar,
	"published_at" timestamp(3) with time zone,
	"listing_limit" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "enum_companies_status"
);

CREATE TABLE IF NOT EXISTS "companies_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "_companies_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"version_title" varchar,
	"version_slug" varchar,
	"version_published_at" timestamp(3) with time zone,
	"version_listing_limit" numeric,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__companies_v_version_status",
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean
);

CREATE TABLE IF NOT EXISTS "_companies_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"companies_id" integer,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "navigation_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "navigation" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "navigation_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"pages_id" integer
);

CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");
CREATE INDEX IF NOT EXISTS "users_rels_order_idx" ON "users_rels" ("order");
CREATE INDEX IF NOT EXISTS "users_rels_parent_idx" ON "users_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "users_rels_path_idx" ON "users_rels" ("path");
CREATE INDEX IF NOT EXISTS "pages_blocks_content_block_order_idx" ON "pages_blocks_content_block" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_content_block_parent_id_idx" ON "pages_blocks_content_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_content_block_path_idx" ON "pages_blocks_content_block" ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_header_block_order_idx" ON "pages_blocks_header_block" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_header_block_parent_id_idx" ON "pages_blocks_header_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_header_block_path_idx" ON "pages_blocks_header_block" ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_media_block_images_order_idx" ON "pages_blocks_media_block_images" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_media_block_images_parent_id_idx" ON "pages_blocks_media_block_images" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_media_block_order_idx" ON "pages_blocks_media_block" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_media_block_parent_id_idx" ON "pages_blocks_media_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_media_block_path_idx" ON "pages_blocks_media_block" ("_path");
CREATE INDEX IF NOT EXISTS "pages_slug_idx" ON "pages" ("slug");
CREATE INDEX IF NOT EXISTS "pages_created_at_idx" ON "pages" ("created_at");
CREATE INDEX IF NOT EXISTS "pages__status_idx" ON "pages" ("_status");
CREATE INDEX IF NOT EXISTS "pages_rels_order_idx" ON "pages_rels" ("order");
CREATE INDEX IF NOT EXISTS "pages_rels_parent_idx" ON "pages_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "pages_rels_path_idx" ON "pages_rels" ("path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_block_order_idx" ON "_pages_v_blocks_content_block" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_block_parent_id_idx" ON "_pages_v_blocks_content_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_block_path_idx" ON "_pages_v_blocks_content_block" ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_header_block_order_idx" ON "_pages_v_blocks_header_block" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_header_block_parent_id_idx" ON "_pages_v_blocks_header_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_header_block_path_idx" ON "_pages_v_blocks_header_block" ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_block_images_order_idx" ON "_pages_v_blocks_media_block_images" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_block_images_parent_id_idx" ON "_pages_v_blocks_media_block_images" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_block_order_idx" ON "_pages_v_blocks_media_block" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_block_parent_id_idx" ON "_pages_v_blocks_media_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_block_path_idx" ON "_pages_v_blocks_media_block" ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_version_version_slug_idx" ON "_pages_v" ("version_slug");
CREATE INDEX IF NOT EXISTS "_pages_v_version_version_created_at_idx" ON "_pages_v" ("version_created_at");
CREATE INDEX IF NOT EXISTS "_pages_v_version_version__status_idx" ON "_pages_v" ("version__status");
CREATE INDEX IF NOT EXISTS "_pages_v_created_at_idx" ON "_pages_v" ("created_at");
CREATE INDEX IF NOT EXISTS "_pages_v_updated_at_idx" ON "_pages_v" ("updated_at");
CREATE INDEX IF NOT EXISTS "_pages_v_latest_idx" ON "_pages_v" ("latest");
CREATE INDEX IF NOT EXISTS "_pages_v_rels_order_idx" ON "_pages_v_rels" ("order");
CREATE INDEX IF NOT EXISTS "_pages_v_rels_parent_idx" ON "_pages_v_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_rels_path_idx" ON "_pages_v_rels" ("path");
CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" ("filename");
CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" ("sizes_thumbnail_filename");
CREATE INDEX IF NOT EXISTS "media_sizes_card_sizes_card_filename_idx" ON "media" ("sizes_card_filename");
CREATE INDEX IF NOT EXISTS "media_sizes_tablet_sizes_tablet_filename_idx" ON "media" ("sizes_tablet_filename");
CREATE INDEX IF NOT EXISTS "listings_blocks_content_block_order_idx" ON "listings_blocks_content_block" ("_order");
CREATE INDEX IF NOT EXISTS "listings_blocks_content_block_parent_id_idx" ON "listings_blocks_content_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "listings_blocks_content_block_path_idx" ON "listings_blocks_content_block" ("_path");
CREATE INDEX IF NOT EXISTS "listings_blocks_header_block_order_idx" ON "listings_blocks_header_block" ("_order");
CREATE INDEX IF NOT EXISTS "listings_blocks_header_block_parent_id_idx" ON "listings_blocks_header_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "listings_blocks_header_block_path_idx" ON "listings_blocks_header_block" ("_path");
CREATE INDEX IF NOT EXISTS "listings_blocks_media_block_images_order_idx" ON "listings_blocks_media_block_images" ("_order");
CREATE INDEX IF NOT EXISTS "listings_blocks_media_block_images_parent_id_idx" ON "listings_blocks_media_block_images" ("_parent_id");
CREATE INDEX IF NOT EXISTS "listings_blocks_media_block_order_idx" ON "listings_blocks_media_block" ("_order");
CREATE INDEX IF NOT EXISTS "listings_blocks_media_block_parent_id_idx" ON "listings_blocks_media_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "listings_blocks_media_block_path_idx" ON "listings_blocks_media_block" ("_path");
CREATE INDEX IF NOT EXISTS "listings_slug_idx" ON "listings" ("slug");
CREATE INDEX IF NOT EXISTS "listings_created_at_idx" ON "listings" ("created_at");
CREATE INDEX IF NOT EXISTS "listings__status_idx" ON "listings" ("_status");
CREATE INDEX IF NOT EXISTS "listings_rels_order_idx" ON "listings_rels" ("order");
CREATE INDEX IF NOT EXISTS "listings_rels_parent_idx" ON "listings_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "listings_rels_path_idx" ON "listings_rels" ("path");
CREATE INDEX IF NOT EXISTS "_listings_v_blocks_content_block_order_idx" ON "_listings_v_blocks_content_block" ("_order");
CREATE INDEX IF NOT EXISTS "_listings_v_blocks_content_block_parent_id_idx" ON "_listings_v_blocks_content_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_listings_v_blocks_content_block_path_idx" ON "_listings_v_blocks_content_block" ("_path");
CREATE INDEX IF NOT EXISTS "_listings_v_blocks_header_block_order_idx" ON "_listings_v_blocks_header_block" ("_order");
CREATE INDEX IF NOT EXISTS "_listings_v_blocks_header_block_parent_id_idx" ON "_listings_v_blocks_header_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_listings_v_blocks_header_block_path_idx" ON "_listings_v_blocks_header_block" ("_path");
CREATE INDEX IF NOT EXISTS "_listings_v_blocks_media_block_images_order_idx" ON "_listings_v_blocks_media_block_images" ("_order");
CREATE INDEX IF NOT EXISTS "_listings_v_blocks_media_block_images_parent_id_idx" ON "_listings_v_blocks_media_block_images" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_listings_v_blocks_media_block_order_idx" ON "_listings_v_blocks_media_block" ("_order");
CREATE INDEX IF NOT EXISTS "_listings_v_blocks_media_block_parent_id_idx" ON "_listings_v_blocks_media_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_listings_v_blocks_media_block_path_idx" ON "_listings_v_blocks_media_block" ("_path");
CREATE INDEX IF NOT EXISTS "_listings_v_version_version_slug_idx" ON "_listings_v" ("version_slug");
CREATE INDEX IF NOT EXISTS "_listings_v_version_version_created_at_idx" ON "_listings_v" ("version_created_at");
CREATE INDEX IF NOT EXISTS "_listings_v_version_version__status_idx" ON "_listings_v" ("version__status");
CREATE INDEX IF NOT EXISTS "_listings_v_created_at_idx" ON "_listings_v" ("created_at");
CREATE INDEX IF NOT EXISTS "_listings_v_updated_at_idx" ON "_listings_v" ("updated_at");
CREATE INDEX IF NOT EXISTS "_listings_v_latest_idx" ON "_listings_v" ("latest");
CREATE INDEX IF NOT EXISTS "_listings_v_rels_order_idx" ON "_listings_v_rels" ("order");
CREATE INDEX IF NOT EXISTS "_listings_v_rels_parent_idx" ON "_listings_v_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "_listings_v_rels_path_idx" ON "_listings_v_rels" ("path");
CREATE INDEX IF NOT EXISTS "locations_blocks_content_block_order_idx" ON "locations_blocks_content_block" ("_order");
CREATE INDEX IF NOT EXISTS "locations_blocks_content_block_parent_id_idx" ON "locations_blocks_content_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "locations_blocks_content_block_path_idx" ON "locations_blocks_content_block" ("_path");
CREATE INDEX IF NOT EXISTS "locations_blocks_header_block_order_idx" ON "locations_blocks_header_block" ("_order");
CREATE INDEX IF NOT EXISTS "locations_blocks_header_block_parent_id_idx" ON "locations_blocks_header_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "locations_blocks_header_block_path_idx" ON "locations_blocks_header_block" ("_path");
CREATE INDEX IF NOT EXISTS "locations_blocks_media_block_images_order_idx" ON "locations_blocks_media_block_images" ("_order");
CREATE INDEX IF NOT EXISTS "locations_blocks_media_block_images_parent_id_idx" ON "locations_blocks_media_block_images" ("_parent_id");
CREATE INDEX IF NOT EXISTS "locations_blocks_media_block_order_idx" ON "locations_blocks_media_block" ("_order");
CREATE INDEX IF NOT EXISTS "locations_blocks_media_block_parent_id_idx" ON "locations_blocks_media_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "locations_blocks_media_block_path_idx" ON "locations_blocks_media_block" ("_path");
CREATE INDEX IF NOT EXISTS "locations_slug_idx" ON "locations" ("slug");
CREATE INDEX IF NOT EXISTS "locations_created_at_idx" ON "locations" ("created_at");
CREATE INDEX IF NOT EXISTS "locations__status_idx" ON "locations" ("_status");
CREATE INDEX IF NOT EXISTS "locations_rels_order_idx" ON "locations_rels" ("order");
CREATE INDEX IF NOT EXISTS "locations_rels_parent_idx" ON "locations_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "locations_rels_path_idx" ON "locations_rels" ("path");
CREATE INDEX IF NOT EXISTS "_locations_v_blocks_content_block_order_idx" ON "_locations_v_blocks_content_block" ("_order");
CREATE INDEX IF NOT EXISTS "_locations_v_blocks_content_block_parent_id_idx" ON "_locations_v_blocks_content_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_locations_v_blocks_content_block_path_idx" ON "_locations_v_blocks_content_block" ("_path");
CREATE INDEX IF NOT EXISTS "_locations_v_blocks_header_block_order_idx" ON "_locations_v_blocks_header_block" ("_order");
CREATE INDEX IF NOT EXISTS "_locations_v_blocks_header_block_parent_id_idx" ON "_locations_v_blocks_header_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_locations_v_blocks_header_block_path_idx" ON "_locations_v_blocks_header_block" ("_path");
CREATE INDEX IF NOT EXISTS "_locations_v_blocks_media_block_images_order_idx" ON "_locations_v_blocks_media_block_images" ("_order");
CREATE INDEX IF NOT EXISTS "_locations_v_blocks_media_block_images_parent_id_idx" ON "_locations_v_blocks_media_block_images" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_locations_v_blocks_media_block_order_idx" ON "_locations_v_blocks_media_block" ("_order");
CREATE INDEX IF NOT EXISTS "_locations_v_blocks_media_block_parent_id_idx" ON "_locations_v_blocks_media_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_locations_v_blocks_media_block_path_idx" ON "_locations_v_blocks_media_block" ("_path");
CREATE INDEX IF NOT EXISTS "_locations_v_version_version_slug_idx" ON "_locations_v" ("version_slug");
CREATE INDEX IF NOT EXISTS "_locations_v_version_version_created_at_idx" ON "_locations_v" ("version_created_at");
CREATE INDEX IF NOT EXISTS "_locations_v_version_version__status_idx" ON "_locations_v" ("version__status");
CREATE INDEX IF NOT EXISTS "_locations_v_created_at_idx" ON "_locations_v" ("created_at");
CREATE INDEX IF NOT EXISTS "_locations_v_updated_at_idx" ON "_locations_v" ("updated_at");
CREATE INDEX IF NOT EXISTS "_locations_v_latest_idx" ON "_locations_v" ("latest");
CREATE INDEX IF NOT EXISTS "_locations_v_rels_order_idx" ON "_locations_v_rels" ("order");
CREATE INDEX IF NOT EXISTS "_locations_v_rels_parent_idx" ON "_locations_v_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "_locations_v_rels_path_idx" ON "_locations_v_rels" ("path");
CREATE INDEX IF NOT EXISTS "companies_slug_idx" ON "companies" ("slug");
CREATE INDEX IF NOT EXISTS "companies_created_at_idx" ON "companies" ("created_at");
CREATE INDEX IF NOT EXISTS "companies__status_idx" ON "companies" ("_status");
CREATE INDEX IF NOT EXISTS "companies_rels_order_idx" ON "companies_rels" ("order");
CREATE INDEX IF NOT EXISTS "companies_rels_parent_idx" ON "companies_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "companies_rels_path_idx" ON "companies_rels" ("path");
CREATE INDEX IF NOT EXISTS "_companies_v_version_version_slug_idx" ON "_companies_v" ("version_slug");
CREATE INDEX IF NOT EXISTS "_companies_v_version_version_created_at_idx" ON "_companies_v" ("version_created_at");
CREATE INDEX IF NOT EXISTS "_companies_v_version_version__status_idx" ON "_companies_v" ("version__status");
CREATE INDEX IF NOT EXISTS "_companies_v_created_at_idx" ON "_companies_v" ("created_at");
CREATE INDEX IF NOT EXISTS "_companies_v_updated_at_idx" ON "_companies_v" ("updated_at");
CREATE INDEX IF NOT EXISTS "_companies_v_latest_idx" ON "_companies_v" ("latest");
CREATE INDEX IF NOT EXISTS "_companies_v_rels_order_idx" ON "_companies_v_rels" ("order");
CREATE INDEX IF NOT EXISTS "_companies_v_rels_parent_idx" ON "_companies_v_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "_companies_v_rels_path_idx" ON "_companies_v_rels" ("path");
CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" ("key");
CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" ("created_at");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" ("order");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" ("path");
CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" ("created_at");
CREATE INDEX IF NOT EXISTS "navigation_items_order_idx" ON "navigation_items" ("_order");
CREATE INDEX IF NOT EXISTS "navigation_items_parent_id_idx" ON "navigation_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "navigation_rels_order_idx" ON "navigation_rels" ("order");
CREATE INDEX IF NOT EXISTS "navigation_rels_parent_idx" ON "navigation_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "navigation_rels_path_idx" ON "navigation_rels" ("path");
DO $$ BEGIN
 ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_companies_fk" FOREIGN KEY ("companies_id") REFERENCES "companies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_content_block" ADD CONSTRAINT "pages_blocks_content_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_header_block" ADD CONSTRAINT "pages_blocks_header_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_media_block_images" ADD CONSTRAINT "pages_blocks_media_block_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_media_block"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_listings_fk" FOREIGN KEY ("listings_id") REFERENCES "listings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_content_block" ADD CONSTRAINT "_pages_v_blocks_content_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_header_block" ADD CONSTRAINT "_pages_v_blocks_header_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_media_block_images" ADD CONSTRAINT "_pages_v_blocks_media_block_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v_blocks_media_block"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_listings_fk" FOREIGN KEY ("listings_id") REFERENCES "listings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "listings_blocks_content_block" ADD CONSTRAINT "listings_blocks_content_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "listings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "listings_blocks_header_block" ADD CONSTRAINT "listings_blocks_header_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "listings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "listings_blocks_media_block_images" ADD CONSTRAINT "listings_blocks_media_block_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "listings_blocks_media_block"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "listings_blocks_media_block" ADD CONSTRAINT "listings_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "listings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "listings_rels" ADD CONSTRAINT "listings_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "listings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "listings_rels" ADD CONSTRAINT "listings_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "listings_rels" ADD CONSTRAINT "listings_rels_companies_fk" FOREIGN KEY ("companies_id") REFERENCES "companies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "listings_rels" ADD CONSTRAINT "listings_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "listings_rels" ADD CONSTRAINT "listings_rels_listings_fk" FOREIGN KEY ("listings_id") REFERENCES "listings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_listings_v_blocks_content_block" ADD CONSTRAINT "_listings_v_blocks_content_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_listings_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_listings_v_blocks_header_block" ADD CONSTRAINT "_listings_v_blocks_header_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_listings_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_listings_v_blocks_media_block_images" ADD CONSTRAINT "_listings_v_blocks_media_block_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_listings_v_blocks_media_block"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_listings_v_blocks_media_block" ADD CONSTRAINT "_listings_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_listings_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_listings_v_rels" ADD CONSTRAINT "_listings_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "_listings_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_listings_v_rels" ADD CONSTRAINT "_listings_v_rels_listings_fk" FOREIGN KEY ("listings_id") REFERENCES "listings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_listings_v_rels" ADD CONSTRAINT "_listings_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_listings_v_rels" ADD CONSTRAINT "_listings_v_rels_companies_fk" FOREIGN KEY ("companies_id") REFERENCES "companies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_listings_v_rels" ADD CONSTRAINT "_listings_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "locations_blocks_content_block" ADD CONSTRAINT "locations_blocks_content_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "locations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "locations_blocks_header_block" ADD CONSTRAINT "locations_blocks_header_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "locations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "locations_blocks_media_block_images" ADD CONSTRAINT "locations_blocks_media_block_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "locations_blocks_media_block"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "locations_blocks_media_block" ADD CONSTRAINT "locations_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "locations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "locations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_listings_fk" FOREIGN KEY ("listings_id") REFERENCES "listings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_locations_v_blocks_content_block" ADD CONSTRAINT "_locations_v_blocks_content_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_locations_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_locations_v_blocks_header_block" ADD CONSTRAINT "_locations_v_blocks_header_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_locations_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_locations_v_blocks_media_block_images" ADD CONSTRAINT "_locations_v_blocks_media_block_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_locations_v_blocks_media_block"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_locations_v_blocks_media_block" ADD CONSTRAINT "_locations_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_locations_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_locations_v_rels" ADD CONSTRAINT "_locations_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "_locations_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_locations_v_rels" ADD CONSTRAINT "_locations_v_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "locations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_locations_v_rels" ADD CONSTRAINT "_locations_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_locations_v_rels" ADD CONSTRAINT "_locations_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_locations_v_rels" ADD CONSTRAINT "_locations_v_rels_listings_fk" FOREIGN KEY ("listings_id") REFERENCES "listings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "companies_rels" ADD CONSTRAINT "companies_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "companies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "companies_rels" ADD CONSTRAINT "companies_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_companies_v_rels" ADD CONSTRAINT "_companies_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "_companies_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_companies_v_rels" ADD CONSTRAINT "_companies_v_rels_companies_fk" FOREIGN KEY ("companies_id") REFERENCES "companies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_companies_v_rels" ADD CONSTRAINT "_companies_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "navigation_items" ADD CONSTRAINT "navigation_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "navigation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "navigation_rels" ADD CONSTRAINT "navigation_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "navigation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "navigation_rels" ADD CONSTRAINT "navigation_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "users";
DROP TABLE "users_rels";
DROP TABLE "pages_blocks_content_block";
DROP TABLE "pages_blocks_header_block";
DROP TABLE "pages_blocks_media_block_images";
DROP TABLE "pages_blocks_media_block";
DROP TABLE "pages";
DROP TABLE "pages_rels";
DROP TABLE "_pages_v_blocks_content_block";
DROP TABLE "_pages_v_blocks_header_block";
DROP TABLE "_pages_v_blocks_media_block_images";
DROP TABLE "_pages_v_blocks_media_block";
DROP TABLE "_pages_v";
DROP TABLE "_pages_v_rels";
DROP TABLE "media";
DROP TABLE "listings_blocks_content_block";
DROP TABLE "listings_blocks_header_block";
DROP TABLE "listings_blocks_media_block_images";
DROP TABLE "listings_blocks_media_block";
DROP TABLE "listings";
DROP TABLE "listings_rels";
DROP TABLE "_listings_v_blocks_content_block";
DROP TABLE "_listings_v_blocks_header_block";
DROP TABLE "_listings_v_blocks_media_block_images";
DROP TABLE "_listings_v_blocks_media_block";
DROP TABLE "_listings_v";
DROP TABLE "_listings_v_rels";
DROP TABLE "locations_blocks_content_block";
DROP TABLE "locations_blocks_header_block";
DROP TABLE "locations_blocks_media_block_images";
DROP TABLE "locations_blocks_media_block";
DROP TABLE "locations";
DROP TABLE "locations_rels";
DROP TABLE "_locations_v_blocks_content_block";
DROP TABLE "_locations_v_blocks_header_block";
DROP TABLE "_locations_v_blocks_media_block_images";
DROP TABLE "_locations_v_blocks_media_block";
DROP TABLE "_locations_v";
DROP TABLE "_locations_v_rels";
DROP TABLE "companies";
DROP TABLE "companies_rels";
DROP TABLE "_companies_v";
DROP TABLE "_companies_v_rels";
DROP TABLE "payload_preferences";
DROP TABLE "payload_preferences_rels";
DROP TABLE "payload_migrations";
DROP TABLE "navigation_items";
DROP TABLE "navigation";
DROP TABLE "navigation_rels";`);

};
