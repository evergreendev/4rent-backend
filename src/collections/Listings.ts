import { CollectionConfig } from "payload/types";
import MediaBlock from "../blocks/MediaBlock";

export const Listings: CollectionConfig = {
    slug: "listings",
    admin: {
        useAsTitle: "title"
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
