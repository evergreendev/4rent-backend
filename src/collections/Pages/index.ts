import {CollectionConfig} from "payload/types";
import MediaBlock from "../../blocks/MediaBlock";
import {isAdmin} from "../../access/isAdmin";
import {isAdminOrPublished} from "../../access/isAdminOrPublished";
import {slugField} from "../../fields/slug";
import {populatePublishedAt} from "../../hooks/populatePublishedAt";
import {revalidatePage} from "./hooks/revalidateProjects";

export const Pages: CollectionConfig = {
    slug: "pages",
    admin: {
        useAsTitle: "title",
        hidden: ({user}) => user.role !== "admin"
    },
    hooks:{
        beforeChange: [populatePublishedAt],
        afterChange: [revalidatePage]
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
    fields: [
        {
            name: "title",
            type: "text",
            required: true,
        },
        slugField(),
        {
            name: 'publishedAt',
            type: 'date',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: "content",
            type: "blocks",
            minRows: 1,
            maxRows: 20,
            blocks: [
                MediaBlock
            ]
        },
    ]
}
