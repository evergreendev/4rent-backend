import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import Users from './collections/Users'
import {Pages} from "./collections/Pages";
import {Navigation} from "./globals/Navigation";
import {Media} from "./collections/Media";
import {Listings} from "./collections/Listings";
import {Locations} from "./collections/Locations";
import {Companies} from "./collections/Companies";

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    css: path.resolve(__dirname, 'style.scss')
  },
  editor: slateEditor({}),
  collections: [Users,Pages,Media,Listings,Locations,Companies],
  globals: [Navigation],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
})
