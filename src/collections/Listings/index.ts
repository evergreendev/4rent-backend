import { CollectionConfig } from "payload/types";
import MediaBlock from "../../blocks/MediaBlock";
import {isAdminOrHasListingAccess} from "../../access/isAdminOrHasListingAccess";
import {isAdmin} from "../../access/isAdmin";
import {revalidateListing} from "./hooks/revalidateListing";
import {slugField} from "../../fields/slug";

export const Listings: CollectionConfig = {
    slug: "listings",
    admin: {
        useAsTitle: "title",
        defaultColumns: ["title","status"]
    },
    hooks: {
        afterChange: [revalidateListing]
    },
    versions: {
        drafts: true
    },
    access: {
        read: isAdminOrHasListingAccess(),
        create: isAdmin(),
        update: isAdminOrHasListingAccess(),
        delete: isAdminOrHasListingAccess()
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true,
        },
        slugField(),
        {
            name: "content",
            type: "blocks",
            minRows: 1,
            maxRows: 20,
            blocks: [
                MediaBlock
            ]
        }
    ]
}
