import {Block} from "payload/types"

const ContentBlock: Block = {
    slug: "ContentBlock",
    fields: [
        {
            name: "content",
            type: "richText",
            required: true
        }
    ]
}

export default ContentBlock;
