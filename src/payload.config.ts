import path from 'path'

import {payloadCloud} from '@payloadcms/plugin-cloud'
import {postgresAdapter} from '@payloadcms/db-postgres'
import {webpackBundler} from '@payloadcms/bundler-webpack'
import {slateEditor} from '@payloadcms/richtext-slate'
import {buildConfig} from 'payload/config'

import Users from './collections/Users'
import {Pages} from "./collections/Pages";
import {Navigation} from "./globals/Navigation";
import {Media} from "./collections/Media";
import {Listings} from "./collections/Listings";
import {Locations} from "./collections/Locations";
import {Companies} from "./collections/Companies";
import {Logo} from "./graphics/Logo";
import {Icon} from "./graphics/Icon";

export default buildConfig({
    admin: {
        meta: {
          titleSuffix: "- 4RENT BLACKHILLS",
            favicon: "/assets/4rent-black-hills.svg",
            ogImage: "/assets/4rent-black-hills.svg"
        },
        user: Users.slug,
        bundler: webpackBundler(),
        css: path.resolve(__dirname, 'style.scss'),
        components: {
            graphics: {
                Logo,
                Icon
            }
        },
    },
    cors: [process.env.PAYLOAD_PUBLIC_NEXT_URL],
    editor: slateEditor({}),
    collections: [Users, Pages, Media, Listings, Locations, Companies],
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
