import {Block} from "payload/types"

const MediaBlock: Block = {
    slug: "MediaBlock",
    fields: [
        {
            name: "title",
            type: "text",
            required: true
        },
        {
            name: "content",
            type: "richText"
        },
        {
            type: "array",
            name: "images",
            maxRows: 2,
            fields: [
                {
                    name: "image",
                    label:"image",
                    type: "upload",
                    relationTo: "media",
                }
            ]
        }
    ]
}

export default MediaBlock;
