import {CollectionConfig} from "payload/types";
import {isAdminOrHasCompanyAccess} from "../../access/isAdminOrHasCompanyAccess";
import {isAdmin, isAdminFieldLevel} from "../../access/isAdmin";
import {revalidateCompany} from "./hooks/revalidateCompany";
import standardFields from "../../fields/standardFields";
import {populatePublishedAt} from "../../hooks/populatePublishedAt";
import {isAdminOrHasCompanyAccessOrIsPublished} from "../../access/isAdminOrHasCompanyAccessOrIsPublished";

export const Companies: CollectionConfig = {
    slug: "companies",
    admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "status"]
    },
    hooks: {
        beforeChange: [populatePublishedAt],
        afterChange: [revalidateCompany]
    },
    versions: {
        drafts: true
    },
    access: {
        read: isAdminOrHasCompanyAccessOrIsPublished(),
        create: isAdmin(),
        update: isAdminOrHasCompanyAccess(),
        delete: isAdminOrHasCompanyAccess()
    },
    fields: [
        ...standardFields,
        {
            name: "listing_limit",
            label: "Max number of published listings",
            type: "number",
            min: 0,
            required: true,
            access: {
                update: isAdminFieldLevel
            }
        }
    ]
}
