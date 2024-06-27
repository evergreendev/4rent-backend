import { CollectionConfig } from "payload/types";
import MediaBlock from "../blocks/MediaBlock";
import {isAdminOrHasListingAccess} from "../access/isAdminOrHasListingAccess";
import {isAdmin} from "../access/isAdmin";

export const Listings: CollectionConfig = {
    slug: "listings",
    admin: {
        useAsTitle: "title"
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
