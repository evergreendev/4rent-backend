import {CollectionConfig} from "payload/types";
import {isAdmin} from "../../access/isAdmin";
import {isAdminOrPublished} from "../../access/isAdminOrPublished";
import {populatePublishedAt} from "../../hooks/populatePublishedAt";
import {revalidateLocation} from "./hooks/revalidateLocation";
import standardFields from "../../fields/standardFields";
import standardBlocks from "../../blocks";

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
    fields: [...standardFields,    {
        name: "content",
        type: "blocks",
        minRows: 1,
        maxRows: 20,
        blocks: standardBlocks
    }]
}
