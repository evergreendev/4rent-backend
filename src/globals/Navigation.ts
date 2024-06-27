import { GlobalConfig } from "payload/types";

export const Navigation: GlobalConfig = {
    slug: "navigation",
    admin: {
        hidden: ({user}) => user.role !== "admin"
    },
    fields: [
        {
            name: "items",
            type: "array",
            required: true,
            maxRows: 8,
            fields: [
                {
                    name: "page",
                    type: "relationship",
                    relationTo: ['pages'],
                    required: true
                }
            ]
        }
    ]
}
