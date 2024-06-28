import {Block} from "payload/types"

const HeaderBlock: Block = {
    slug: "HeaderBlock",
    fields: [
        {
            name: "header",
            type: "text",
            required: true
        },
        {
            name: "showSearch",
            label: "Show Search Bar",
            type: "checkbox",
        },
        {
            name: "image",
            label:"image",
            type: "upload",
            relationTo: "media",
        }
    ]
}

export default HeaderBlock;
