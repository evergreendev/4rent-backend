import {CollectionConfig} from "payload/types";
import {isAdmin} from "../../access/isAdmin";
import {isAdminOrPublished} from "../../access/isAdminOrPublished";
import {populatePublishedAt} from "../../hooks/populatePublishedAt";
import {revalidateLocation} from "./hooks/revalidateLocation";
import standardFields from "../../fields/standardFields";

export const Locations: CollectionConfig = {
    slug: "locations",
    admin: {
        useAsTitle: "title",
        hidden: ({user}) => user.role !== "admin"
    },
    hooks:{
        beforeChange: [populatePublishedAt],
        afterChange: [revalidateLocation]
    },
    versions: {
        drafts: true
    },
    access: {
        read: isAdminOrPublished(),
        update: isAdmin(),
        create: isAdmin(),
        delete: isAdmin()
    },
    fields: [...standardFields]
}
