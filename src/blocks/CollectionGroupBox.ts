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
        }
    ]
}

export default CollectionGroupBlock;
