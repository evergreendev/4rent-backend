import {slugField} from "./slug";
import standardBlocks from "../blocks";
import {Field} from "payload/types";

const standardFields: Field[] = [{
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
        name: 'featuredImage',
        label: 'Featured Image',
        type: 'upload',
        relationTo: "media",
        admin: {
            position: 'sidebar',
        }
    },
    {
        name: "content",
        type: "blocks",
        minRows: 1,
        maxRows: 20,
        blocks: standardBlocks
    }]

export default standardFields;
