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
            name: "button",
            type: "group",
            fields: [
                {
                    name: "ButtonText",
                    label: "Button Text",
                    type: "text"
                },
                {
                    name: "ExternalLink",
                    label: "External Link?",
                    type: "checkbox"
                },
                {
                    name: "Page",
                    type: "relationship",
                    relationTo: ["pages","listings"],
                    admin: {
                        condition:(data, siblingData) => {
                            return !siblingData.ExternalLink;
                        }
                    }
                },
                {
                    name: "Url",
                    label: "External Url",
                    type: "text",
                    admin: {
                        condition:(data, siblingData) => {
                            return siblingData.ExternalLink;
                        }
                    },
                    validate: value => {
                        if(!value) return true;
                        try {
                            new URL(value);
                            return true;
                        } catch (err) {
                            return "Invalid URL. Url needs to start with https:// or http://";
                        }
                    }
                }
            ]
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
