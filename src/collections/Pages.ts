import {CollectionConfig} from "payload/types";
import MediaBlock from "../blocks/MediaBlock";

export const Pages: CollectionConfig = {
    slug: "pages",
    admin: {
        useAsTitle: "title",
        hidden: ({user}) => user.role !== "admin"
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
