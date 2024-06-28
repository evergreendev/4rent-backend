import {CollectionConfig} from "payload/types";
import {isAdminOrHasListingAccess} from "../../access/isAdminOrHasListingAccess";
import {isAdmin} from "../../access/isAdmin";
import {revalidateListing} from "./hooks/revalidateListing";
import standardFields from "../../fields/standardFields";
import AddressSearch from "../../fields/AddressSearch";

export const Listings: CollectionConfig = {
    slug: "listings",
    admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "status"]
    },
    hooks: {
        afterChange: [revalidateListing]
    },
    versions: {
        drafts: true
    },
    access: {
        read: isAdminOrHasListingAccess(),
        create: isAdmin(),
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

                    console.log(addressJson);

                    res.status(200).send(addressJson)
                } catch (e){
                    console.log(e)
                    res.status(500).send(e.message())
                }

            }
        }
    ],
    fields: [
        ...standardFields,
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
        {
            name: "address",
            type: "group",
            hidden: true,
            fields: [

            ]
        }
    ]
}
