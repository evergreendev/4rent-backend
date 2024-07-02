import {CollectionConfig} from "payload/types";
import {revalidateListing} from "./hooks/revalidateListing";
import standardFields from "../../fields/standardFields";
import AddressSearch from "../../fields/AddressSearch";
import {populatePublishedAt} from "../../hooks/populatePublishedAt";
import {updateLatAndLong} from "./hooks/updateLatAndLong";
import standardBlocks from "../../blocks";
import {isAdminOrHasListingAccess} from "../../access/isAdminOrHasListingAccess";
import {checkForListingLimit} from "./hooks/checkForListingLimit";

export const Listings: CollectionConfig = {
    slug: "listings",
    admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "status","company"]
    },
    hooks: {
        beforeChange: [populatePublishedAt,updateLatAndLong,checkForListingLimit],
        afterChange: [revalidateListing]
    },
    versions: {
        drafts: true
    },
    access: {
        read: isAdminOrHasListingAccess(),
        update: isAdminOrHasListingAccess(),
        delete: isAdminOrHasListingAccess()
    },
    endpoints: [
        {
            path: "/address-search",
            method: "post",
            handler: async (req, res, next) => {
                if (!req.body.address) return;

                try{
                    const addressRes = await fetch(
                        `https://api.radar.io/v1/search/autocomplete?query=${encodeURIComponent(req.body.address)}}`,
                        {
                            headers: {
                                "Authorization":process.env.PAYLOAD_PUBLIC_RADAR_PUBLISHABLE,
                            }
                        }
                    );
                    if (addressRes.status !== 200) res.status(500).send();


                    const addressJson = await addressRes.json();

                    res.status(200).send(addressJson)
                } catch (e){
                    console.log(e)
                    res.status(500).send(e.message())
                } finally {
                    next();
                }

            }
        }
    ],
    fields: [
        ...standardFields,
        {
            name: "company",
            type: "relationship",
            relationTo: "companies",
            required: true
        },
        {
            name: "content",
            type: "blocks",
            minRows: 1,
            maxRows: 20,
            blocks: standardBlocks
        },
        {
            name: "addressSearch",
            label: "Address Search",
            type: "ui",
            admin: {
                components: {
                    Field: AddressSearch
                }
            }
        },
        {
            name: "street",
            label: "Street Address",
            type: "text"
        },
        {
            name: "city",
            type: "text"
        },
        {
            name: "state",
            type: "text"
        },
        {
            name: "zip",
            label: "Zip Code",
            type: "text"
        },
        {
            name: "latitude",
            type: "text",
            hidden: true
        },
        {
            name: "longitude",
            type: "text",
            hidden: true
        },
    ]
}
