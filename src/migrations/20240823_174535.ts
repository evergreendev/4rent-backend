import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_collection_group_block_type" AS ENUM('featured_images', 'buttons');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_collection_group_block_type" AS ENUM('featured_images', 'buttons');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_listings_features_unit_amenities_items" AS ENUM('Air/Heat (central)', 'Appliances (Brand New)', 'Breakfast Bar', 'Cable Ready', 'Carpeting', 'Ceiling Fan(s)', 'Dead Bolt Locks', 'Dining Area', 'Dishwasher', 'Disposal', 'DSL Ready', 'Extra Storage', 'Fully Equipped Kitchen', 'Internet Access', 'Large Closet Space', 'Primary Bedrooms', 'Microwave', 'Non-Smoking Units', 'Pantry Space', 'Patio or Balcony', 'Security Monitor', 'Spacious Bedrooms', 'Tile Floors', 'Vaulted Ceilings', 'Walk-In Closets', 'Washer Dryer In Unit', 'Window Blinds', 'Walk In Shower');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_listings_features_community_amenities_items" AS ENUM('Accepts Electronic Payments', 'Basketball Court', 'Business Center/Media Room', 'Close to Public Transportation', 'Club House/Community Room', 'Community Patio', 'Controlled Access', 'Corporate/Guest Suite', 'Dog Park', 'Elevator', 'Fitness Center', 'Maintenance (24hr Emergency)', 'Non-Smoking Buildings', 'Handicap Units', 'Laundry Facilities', 'Lawn Care', 'Maintenance (on-site)', 'Management (on-site)', 'Near Bike Trails', 'Near Shopping, Dining, and Entertainment', 'Non-Smoking Community', 'Playground', 'Pool', 'Professionally Landscaped', 'Snow Removal', 'Storage Space Available', 'Courtyard');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_listings_features_utilities_included_items" AS ENUM('Electric', 'Internet', 'Garbage', 'Heat', 'Sewer', 'Water');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_listings_features_parking_options_items" AS ENUM('Garage Available', 'Off Street Parking');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_listings_features_pets_items" AS ENUM('Cats Allowed', 'Dogs Allowed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_listings_features_lease_options_items" AS ENUM('12 Month', '6 Month');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__listings_v_version_features_unit_amenities_items" AS ENUM('Air/Heat (central)', 'Appliances (Brand New)', 'Breakfast Bar', 'Cable Ready', 'Carpeting', 'Ceiling Fan(s)', 'Dead Bolt Locks', 'Dining Area', 'Dishwasher', 'Disposal', 'DSL Ready', 'Extra Storage', 'Fully Equipped Kitchen', 'Internet Access', 'Large Closet Space', 'Primary Bedrooms', 'Microwave', 'Non-Smoking Units', 'Pantry Space', 'Patio or Balcony', 'Security Monitor', 'Spacious Bedrooms', 'Tile Floors', 'Vaulted Ceilings', 'Walk-In Closets', 'Washer Dryer In Unit', 'Window Blinds', 'Walk In Shower');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__listings_v_version_features_community_amenities_items" AS ENUM('Accepts Electronic Payments', 'Basketball Court', 'Business Center/Media Room', 'Close to Public Transportation', 'Club House/Community Room', 'Community Patio', 'Controlled Access', 'Corporate/Guest Suite', 'Dog Park', 'Elevator', 'Fitness Center', 'Maintenance (24hr Emergency)', 'Non-Smoking Buildings', 'Handicap Units', 'Laundry Facilities', 'Lawn Care', 'Maintenance (on-site)', 'Management (on-site)', 'Near Bike Trails', 'Near Shopping, Dining, and Entertainment', 'Non-Smoking Community', 'Playground', 'Pool', 'Professionally Landscaped', 'Snow Removal', 'Storage Space Available', 'Courtyard');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__listings_v_version_features_utilities_included_items" AS ENUM('Electric', 'Internet', 'Garbage', 'Heat', 'Sewer', 'Water');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__listings_v_version_features_parking_options_items" AS ENUM('Garage Available', 'Off Street Parking');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__listings_v_version_features_pets_items" AS ENUM('Cats Allowed', 'Dogs Allowed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__listings_v_version_features_lease_options_items" AS ENUM('12 Month', '6 Month');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_locations_blocks_collection_group_block_type" AS ENUM('featured_images', 'buttons');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__locations_v_blocks_collection_group_block_type" AS ENUM('featured_images', 'buttons');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "pages_blocks_collection_group_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"type" "enum_pages_blocks_collection_group_block_type",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_collection_group_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"type" "enum__pages_v_blocks_collection_group_block_type",
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "listings_gallery" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "listings_features_unit_amenities_items" (
	"order" integer NOT NULL,
	"parent_id" integer NOT NULL,
	"value" "enum_listings_features_unit_amenities_items",
	"id" serial PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "listings_features_community_amenities_items" (
	"order" integer NOT NULL,
	"parent_id" integer NOT NULL,
	"value" "enum_listings_features_community_amenities_items",
	"id" serial PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "listings_features_utilities_included_items" (
	"order" integer NOT NULL,
	"parent_id" integer NOT NULL,
	"value" "enum_listings_features_utilities_included_items",
	"id" serial PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "listings_features_parking_options_items" (
	"order" integer NOT NULL,
	"parent_id" integer NOT NULL,
	"value" "enum_listings_features_parking_options_items",
	"id" serial PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "listings_features_pets_items" (
	"order" integer NOT NULL,
	"parent_id" integer NOT NULL,
	"value" "enum_listings_features_pets_items",
	"id" serial PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "listings_features_lease_options_items" (
	"order" integer NOT NULL,
	"parent_id" integer NOT NULL,
	"value" "enum_listings_features_lease_options_items",
	"id" serial PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "listings_features_floorplans" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"beds" numeric,
	"bath" numeric,
	"starting_at" numeric,
	"sq_ft" numeric
);

CREATE TABLE IF NOT EXISTS "_listings_v_version_gallery" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_listings_v_version_features_unit_amenities_items" (
	"order" integer NOT NULL,
	"parent_id" integer NOT NULL,
	"value" "enum__listings_v_version_features_unit_amenities_items",
	"id" serial PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "_listings_v_version_features_community_amenities_items" (
	"order" integer NOT NULL,
	"parent_id" integer NOT NULL,
	"value" "enum__listings_v_version_features_community_amenities_items",
	"id" serial PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "_listings_v_version_features_utilities_included_items" (
	"order" integer NOT NULL,
	"parent_id" integer NOT NULL,
	"value" "enum__listings_v_version_features_utilities_included_items",
	"id" serial PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "_listings_v_version_features_parking_options_items" (
	"order" integer NOT NULL,
	"parent_id" integer NOT NULL,
	"value" "enum__listings_v_version_features_parking_options_items",
	"id" serial PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "_listings_v_version_features_pets_items" (
	"order" integer NOT NULL,
	"parent_id" integer NOT NULL,
	"value" "enum__listings_v_version_features_pets_items",
	"id" serial PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "_listings_v_version_features_lease_options_items" (
	"order" integer NOT NULL,
	"parent_id" integer NOT NULL,
	"value" "enum__listings_v_version_features_lease_options_items",
	"id" serial PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "_listings_v_version_features_floorplans" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"beds" numeric,
	"bath" numeric,
	"starting_at" numeric,
	"sq_ft" numeric,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "locations_blocks_collection_group_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"type" "enum_locations_blocks_collection_group_block_type",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_locations_v_blocks_collection_group_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"type" "enum__locations_v_blocks_collection_group_block_type",
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "site_options" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_title" varchar NOT NULL,
	"site_description" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "site_options_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

ALTER TABLE "pages_rels" ADD COLUMN "locations_id" integer;
ALTER TABLE "_pages_v_rels" ADD COLUMN "locations_id" integer;
ALTER TABLE "listings" ADD COLUMN "property_description" jsonb;
ALTER TABLE "listings" ADD COLUMN "features_additional_information_description" varchar;
ALTER TABLE "listings" ADD COLUMN "features_additional_information_application_fee" varchar;
ALTER TABLE "listings" ADD COLUMN "features_additional_information_security_deposit" varchar;
ALTER TABLE "listings" ADD COLUMN "features_additional_information_pet_deposit" varchar;
ALTER TABLE "listings" ADD COLUMN "features_additional_information_pet_rent" numeric;
ALTER TABLE "listings" ADD COLUMN "contact_phone" varchar;
ALTER TABLE "listings" ADD COLUMN "contact_email" varchar;
ALTER TABLE "listings_rels" ADD COLUMN "locations_id" integer;
ALTER TABLE "_listings_v" ADD COLUMN "version_property_description" jsonb;
ALTER TABLE "_listings_v" ADD COLUMN "version_features_additional_information_description" varchar;
ALTER TABLE "_listings_v" ADD COLUMN "version_features_additional_information_application_fee" varchar;
ALTER TABLE "_listings_v" ADD COLUMN "version_features_additional_information_security_deposit" varchar;
ALTER TABLE "_listings_v" ADD COLUMN "version_features_additional_information_pet_deposit" varchar;
ALTER TABLE "_listings_v" ADD COLUMN "version_features_additional_information_pet_rent" numeric;
ALTER TABLE "_listings_v" ADD COLUMN "version_contact_phone" varchar;
ALTER TABLE "_listings_v" ADD COLUMN "version_contact_email" varchar;
ALTER TABLE "_listings_v_rels" ADD COLUMN "locations_id" integer;
ALTER TABLE "locations_rels" ADD COLUMN "locations_id" integer;
CREATE INDEX IF NOT EXISTS "pages_blocks_collection_group_block_order_idx" ON "pages_blocks_collection_group_block" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_collection_group_block_parent_id_idx" ON "pages_blocks_collection_group_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_collection_group_block_path_idx" ON "pages_blocks_collection_group_block" ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_collection_group_block_order_idx" ON "_pages_v_blocks_collection_group_block" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_collection_group_block_parent_id_idx" ON "_pages_v_blocks_collection_group_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_collection_group_block_path_idx" ON "_pages_v_blocks_collection_group_block" ("_path");
CREATE INDEX IF NOT EXISTS "listings_gallery_order_idx" ON "listings_gallery" ("_order");
CREATE INDEX IF NOT EXISTS "listings_gallery_parent_id_idx" ON "listings_gallery" ("_parent_id");
CREATE INDEX IF NOT EXISTS "listings_features_unit_amenities_items_order_idx" ON "listings_features_unit_amenities_items" ("order");
CREATE INDEX IF NOT EXISTS "listings_features_unit_amenities_items_parent_idx" ON "listings_features_unit_amenities_items" ("parent_id");
CREATE INDEX IF NOT EXISTS "listings_features_community_amenities_items_order_idx" ON "listings_features_community_amenities_items" ("order");
CREATE INDEX IF NOT EXISTS "listings_features_community_amenities_items_parent_idx" ON "listings_features_community_amenities_items" ("parent_id");
CREATE INDEX IF NOT EXISTS "listings_features_utilities_included_items_order_idx" ON "listings_features_utilities_included_items" ("order");
CREATE INDEX IF NOT EXISTS "listings_features_utilities_included_items_parent_idx" ON "listings_features_utilities_included_items" ("parent_id");
CREATE INDEX IF NOT EXISTS "listings_features_parking_options_items_order_idx" ON "listings_features_parking_options_items" ("order");
CREATE INDEX IF NOT EXISTS "listings_features_parking_options_items_parent_idx" ON "listings_features_parking_options_items" ("parent_id");
CREATE INDEX IF NOT EXISTS "listings_features_pets_items_order_idx" ON "listings_features_pets_items" ("order");
CREATE INDEX IF NOT EXISTS "listings_features_pets_items_parent_idx" ON "listings_features_pets_items" ("parent_id");
CREATE INDEX IF NOT EXISTS "listings_features_lease_options_items_order_idx" ON "listings_features_lease_options_items" ("order");
CREATE INDEX IF NOT EXISTS "listings_features_lease_options_items_parent_idx" ON "listings_features_lease_options_items" ("parent_id");
CREATE INDEX IF NOT EXISTS "listings_features_floorplans_order_idx" ON "listings_features_floorplans" ("_order");
CREATE INDEX IF NOT EXISTS "listings_features_floorplans_parent_id_idx" ON "listings_features_floorplans" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_listings_v_version_gallery_order_idx" ON "_listings_v_version_gallery" ("_order");
CREATE INDEX IF NOT EXISTS "_listings_v_version_gallery_parent_id_idx" ON "_listings_v_version_gallery" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_listings_v_version_features_unit_amenities_items_order_idx" ON "_listings_v_version_features_unit_amenities_items" ("order");
CREATE INDEX IF NOT EXISTS "_listings_v_version_features_unit_amenities_items_parent_idx" ON "_listings_v_version_features_unit_amenities_items" ("parent_id");
CREATE INDEX IF NOT EXISTS "_listings_v_version_features_community_amenities_items_order_idx" ON "_listings_v_version_features_community_amenities_items" ("order");
CREATE INDEX IF NOT EXISTS "_listings_v_version_features_community_amenities_items_parent_idx" ON "_listings_v_version_features_community_amenities_items" ("parent_id");
CREATE INDEX IF NOT EXISTS "_listings_v_version_features_utilities_included_items_order_idx" ON "_listings_v_version_features_utilities_included_items" ("order");
CREATE INDEX IF NOT EXISTS "_listings_v_version_features_utilities_included_items_parent_idx" ON "_listings_v_version_features_utilities_included_items" ("parent_id");
CREATE INDEX IF NOT EXISTS "_listings_v_version_features_parking_options_items_order_idx" ON "_listings_v_version_features_parking_options_items" ("order");
CREATE INDEX IF NOT EXISTS "_listings_v_version_features_parking_options_items_parent_idx" ON "_listings_v_version_features_parking_options_items" ("parent_id");
CREATE INDEX IF NOT EXISTS "_listings_v_version_features_pets_items_order_idx" ON "_listings_v_version_features_pets_items" ("order");
CREATE INDEX IF NOT EXISTS "_listings_v_version_features_pets_items_parent_idx" ON "_listings_v_version_features_pets_items" ("parent_id");
CREATE INDEX IF NOT EXISTS "_listings_v_version_features_lease_options_items_order_idx" ON "_listings_v_version_features_lease_options_items" ("order");
CREATE INDEX IF NOT EXISTS "_listings_v_version_features_lease_options_items_parent_idx" ON "_listings_v_version_features_lease_options_items" ("parent_id");
CREATE INDEX IF NOT EXISTS "_listings_v_version_features_floorplans_order_idx" ON "_listings_v_version_features_floorplans" ("_order");
CREATE INDEX IF NOT EXISTS "_listings_v_version_features_floorplans_parent_id_idx" ON "_listings_v_version_features_floorplans" ("_parent_id");
CREATE INDEX IF NOT EXISTS "locations_blocks_collection_group_block_order_idx" ON "locations_blocks_collection_group_block" ("_order");
CREATE INDEX IF NOT EXISTS "locations_blocks_collection_group_block_parent_id_idx" ON "locations_blocks_collection_group_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "locations_blocks_collection_group_block_path_idx" ON "locations_blocks_collection_group_block" ("_path");
CREATE INDEX IF NOT EXISTS "_locations_v_blocks_collection_group_block_order_idx" ON "_locations_v_blocks_collection_group_block" ("_order");
CREATE INDEX IF NOT EXISTS "_locations_v_blocks_collection_group_block_parent_id_idx" ON "_locations_v_blocks_collection_group_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_locations_v_blocks_collection_group_block_path_idx" ON "_locations_v_blocks_collection_group_block" ("_path");
CREATE INDEX IF NOT EXISTS "site_options_rels_order_idx" ON "site_options_rels" ("order");
CREATE INDEX IF NOT EXISTS "site_options_rels_parent_idx" ON "site_options_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "site_options_rels_path_idx" ON "site_options_rels" ("path");
DO $$ BEGIN
 ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "locations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "locations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "listings_rels" ADD CONSTRAINT "listings_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "locations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_listings_v_rels" ADD CONSTRAINT "_listings_v_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "locations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "locations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "listings_rels" DROP COLUMN IF EXISTS "pages_id";
ALTER TABLE "listings_rels" DROP COLUMN IF EXISTS "listings_id";
ALTER TABLE "_listings_v_rels" DROP COLUMN IF EXISTS "pages_id";
DO $$ BEGIN
 ALTER TABLE "pages_blocks_collection_group_block" ADD CONSTRAINT "pages_blocks_collection_group_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_collection_group_block" ADD CONSTRAINT "_pages_v_blocks_collection_group_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "listings_gallery" ADD CONSTRAINT "listings_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "listings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "listings_features_unit_amenities_items" ADD CONSTRAINT "listings_features_unit_amenities_items_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "listings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "listings_features_community_amenities_items" ADD CONSTRAINT "listings_features_community_amenities_items_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "listings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "listings_features_utilities_included_items" ADD CONSTRAINT "listings_features_utilities_included_items_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "listings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "listings_features_parking_options_items" ADD CONSTRAINT "listings_features_parking_options_items_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "listings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "listings_features_pets_items" ADD CONSTRAINT "listings_features_pets_items_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "listings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "listings_features_lease_options_items" ADD CONSTRAINT "listings_features_lease_options_items_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "listings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "listings_features_floorplans" ADD CONSTRAINT "listings_features_floorplans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "listings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_listings_v_version_gallery" ADD CONSTRAINT "_listings_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_listings_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_listings_v_version_features_unit_amenities_items" ADD CONSTRAINT "_listings_v_version_features_unit_amenities_items_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "_listings_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_listings_v_version_features_community_amenities_items" ADD CONSTRAINT "_listings_v_version_features_community_amenities_items_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "_listings_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_listings_v_version_features_utilities_included_items" ADD CONSTRAINT "_listings_v_version_features_utilities_included_items_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "_listings_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_listings_v_version_features_parking_options_items" ADD CONSTRAINT "_listings_v_version_features_parking_options_items_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "_listings_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_listings_v_version_features_pets_items" ADD CONSTRAINT "_listings_v_version_features_pets_items_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "_listings_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_listings_v_version_features_lease_options_items" ADD CONSTRAINT "_listings_v_version_features_lease_options_items_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "_listings_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_listings_v_version_features_floorplans" ADD CONSTRAINT "_listings_v_version_features_floorplans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_listings_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "locations_blocks_collection_group_block" ADD CONSTRAINT "locations_blocks_collection_group_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "locations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_locations_v_blocks_collection_group_block" ADD CONSTRAINT "_locations_v_blocks_collection_group_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_locations_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site_options_rels" ADD CONSTRAINT "site_options_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "site_options"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site_options_rels" ADD CONSTRAINT "site_options_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

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

DROP TABLE "pages_blocks_collection_group_block";
DROP TABLE "_pages_v_blocks_collection_group_block";
DROP TABLE "listings_gallery";
DROP TABLE "listings_features_unit_amenities_items";
DROP TABLE "listings_features_community_amenities_items";
DROP TABLE "listings_features_utilities_included_items";
DROP TABLE "listings_features_parking_options_items";
DROP TABLE "listings_features_pets_items";
DROP TABLE "listings_features_lease_options_items";
DROP TABLE "listings_features_floorplans";
DROP TABLE "_listings_v_version_gallery";
DROP TABLE "_listings_v_version_features_unit_amenities_items";
DROP TABLE "_listings_v_version_features_community_amenities_items";
DROP TABLE "_listings_v_version_features_utilities_included_items";
DROP TABLE "_listings_v_version_features_parking_options_items";
DROP TABLE "_listings_v_version_features_pets_items";
DROP TABLE "_listings_v_version_features_lease_options_items";
DROP TABLE "_listings_v_version_features_floorplans";
DROP TABLE "locations_blocks_collection_group_block";
DROP TABLE "_locations_v_blocks_collection_group_block";
DROP TABLE "site_options";
DROP TABLE "site_options_rels";
ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_locations_fk";

ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_locations_fk";

ALTER TABLE "listings_rels" DROP CONSTRAINT "listings_rels_locations_fk";

ALTER TABLE "_listings_v_rels" DROP CONSTRAINT "_listings_v_rels_locations_fk";

ALTER TABLE "locations_rels" DROP CONSTRAINT "locations_rels_locations_fk";

ALTER TABLE "listings_rels" ADD COLUMN "pages_id" integer;
ALTER TABLE "listings_rels" ADD COLUMN "listings_id" integer;
ALTER TABLE "_listings_v_rels" ADD COLUMN "pages_id" integer;
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
 ALTER TABLE "_listings_v_rels" ADD CONSTRAINT "_listings_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "locations_id";
ALTER TABLE "_pages_v_rels" DROP COLUMN IF EXISTS "locations_id";
ALTER TABLE "listings" DROP COLUMN IF EXISTS "property_description";
ALTER TABLE "listings" DROP COLUMN IF EXISTS "features_additional_information_description";
ALTER TABLE "listings" DROP COLUMN IF EXISTS "features_additional_information_application_fee";
ALTER TABLE "listings" DROP COLUMN IF EXISTS "features_additional_information_security_deposit";
ALTER TABLE "listings" DROP COLUMN IF EXISTS "features_additional_information_pet_deposit";
ALTER TABLE "listings" DROP COLUMN IF EXISTS "features_additional_information_pet_rent";
ALTER TABLE "listings" DROP COLUMN IF EXISTS "contact_phone";
ALTER TABLE "listings" DROP COLUMN IF EXISTS "contact_email";
ALTER TABLE "listings_rels" DROP COLUMN IF EXISTS "locations_id";
ALTER TABLE "_listings_v" DROP COLUMN IF EXISTS "version_property_description";
ALTER TABLE "_listings_v" DROP COLUMN IF EXISTS "version_features_additional_information_description";
ALTER TABLE "_listings_v" DROP COLUMN IF EXISTS "version_features_additional_information_application_fee";
ALTER TABLE "_listings_v" DROP COLUMN IF EXISTS "version_features_additional_information_security_deposit";
ALTER TABLE "_listings_v" DROP COLUMN IF EXISTS "version_features_additional_information_pet_deposit";
ALTER TABLE "_listings_v" DROP COLUMN IF EXISTS "version_features_additional_information_pet_rent";
ALTER TABLE "_listings_v" DROP COLUMN IF EXISTS "version_contact_phone";
ALTER TABLE "_listings_v" DROP COLUMN IF EXISTS "version_contact_email";
ALTER TABLE "_listings_v_rels" DROP COLUMN IF EXISTS "locations_id";
ALTER TABLE "locations_rels" DROP COLUMN IF EXISTS "locations_id";
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
`);

};
