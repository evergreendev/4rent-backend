import {Block} from "payload/types"

const CollectionGroupBlock: Block = {
    slug: "CollectionGroupBlock",
    fields: [
        {
            name: "collections",
            type: "relationship",
            hasMany: true,
            relationTo: ["pages","listings","locations"],
            required: true
        },
        {
            name: "type",
            type: "select",
            required: true,
            options: [
                {
                    label: "Featured Images",
                    value: "featured_images"
                },
                {
                    label: "Buttons",
                    value: "buttons"
                }
            ]
        }
    ]
}

export default CollectionGroupBlock;
