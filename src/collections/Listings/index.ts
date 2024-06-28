import { CollectionConfig } from "payload/types";
import {isAdminOrHasListingAccess} from "../../access/isAdminOrHasListingAccess";
import {isAdmin} from "../../access/isAdmin";
import {revalidateListing} from "./hooks/revalidateListing";
import standardFields from "../../fields/standardFields";

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
    fields: [...standardFields]
}
