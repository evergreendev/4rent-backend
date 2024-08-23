import {CollectionConfig} from "payload/types";
import {revalidateListing} from "./hooks/revalidateListing";
import standardFields from "../../fields/standardFields";
import AddressSearch from "../../fields/AddressSearch";
import {populatePublishedAt} from "../../hooks/populatePublishedAt";
import {updateLatAndLong} from "./hooks/updateLatAndLong";
import {isAdminOrHasListingAccess} from "../../access/isAdminOrHasListingAccess";
import {checkForListingLimit} from "./hooks/checkForListingLimit";
import {isAdminOrHasListingAccessOrIsPublished} from "../../access/isAdminOrHasListingAccessOrIsPublished";
import payload from "payload";
import {distanceBetweenTwoPoints} from "../../utilities/distanceBetweenTwoPoints";

export const Listings: CollectionConfig = {
    slug: "listings",
    admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "status", "company"]
    },
    hooks: {
        beforeChange: [populatePublishedAt, updateLatAndLong, checkForListingLimit],
        afterChange: [revalidateListing]
    },
    versions: {
        drafts: true
    },
    access: {
        read: isAdminOrHasListingAccessOrIsPublished(),
        update: isAdminOrHasListingAccess(),
        delete: isAdminOrHasListingAccess()
    },
    endpoints: [
        {
            path: "/address-search",
            method: "post",
            handler: async (req, res, next) => {
                if (!req.body.address) return;

                try {
                    const addressRes = await fetch(
                        `https://api.radar.io/v1/search/autocomplete?query=${encodeURIComponent(req.body.address)}}`,
                        {
                            headers: {
                                "Authorization": process.env.PAYLOAD_PUBLIC_RADAR_PUBLISHABLE,
                            }
                        }
                    );
                    if (addressRes.status !== 200) res.status(500).send();


                    const addressJson = await addressRes.json();

                    res.status(200).send(addressJson)
                } catch (e) {
                    console.log(e)
                    res.status(500).send(e.message())
                } finally {
                    next();
                }

            }
        },
        {
            path: "/by-address",
            method: "post",
            handler: async (req, res, next) => {
                if (!req.body.address) return;

                try {
                    const addressRes = await fetch(
                        `https://api.radar.io/v1/search/autocomplete?query=${encodeURIComponent(req.body.address)}}&limit=1`,
                        {
                            headers: {
                                "Authorization": process.env.PAYLOAD_PUBLIC_RADAR_PUBLISHABLE,
                            }
                        }
                    );
                    if (addressRes.status !== 200) res.status(500).send();


                    const addressJson = await addressRes.json();
                    if (addressJson?.addresses?.[0]) {
                        const latLong: [number, number] = [addressJson?.addresses[0].latitude, addressJson?.addresses[0].longitude];
                        const searchDistance = 20;//Could be set dynamically later on if need be.
                        const allListings = await payload.find({
                            collection: "listings",
                            pagination: false
                        });
                        const filteredListings = allListings.docs.map(listing => {
                            return {
                                ...listing,
                                distance: distanceBetweenTwoPoints(
                                    [parseFloat(listing.latitude), parseFloat(listing.longitude)],
                                    latLong)
                            }
                        }).filter(listing => {
                            return listing.distance < searchDistance;
                        }).sort((a, b) => a.distance - b.distance);

                        filteredListings.length = req.body.limit < filteredListings.length ? req.body.limit : filteredListings.length;

                        res.status(200).send({
                            center: latLong,
                            listings: filteredListings
                        })

                    } else res.status(200).send([]);
                } catch (e) {
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
            name: "locations",
            type: "relationship",
            hasMany: true,
            relationTo: "locations",
        },
        {
            name: "gallery",
            type: "array",
            fields: [
                {
                    name: 'gallery_item',
                    type: 'upload',
                    relationTo: "media",
                }
            ]
        },
        {
            name: "property_description",
            label: "Property Description",
            type: "richText",
        },
        {
            name: "features",
            type: "group",
            fields: [
                {
                    name: "unit_amenities",
                    label: "Unit amenities",
                    type: "group",
                    fields: [
                        {
                            name: "items",
                            type: "select",
                            hasMany: true,
                            options: [

                                {
                                    label: "Air/Heat (central)",
                                    value: "Air/Heat (central)"
                                },
                                {
                                    label: "Appliances (Brand New)",
                                    value: "Appliances (Brand New)"
                                },
                                {
                                    label: "Breakfast Bar",
                                    value: "Breakfast Bar"
                                },
                                {
                                    label: "Cable Ready",
                                    value: "Cable Ready"
                                },
                                {
                                    label: "Carpeting",
                                    value: "Carpeting"
                                },
                                {
                                    label: "Ceiling Fan(s)",
                                    value: "Ceiling Fan(s)"
                                },
                                {
                                    label: "Dead Bolt Locks",
                                    value: "Dead Bolt Locks"
                                },
                                {
                                    label: "Dining Area",
                                    value: "Dining Area"
                                },
                                {
                                    label: "Dishwasher",
                                    value: "Dishwasher"
                                },
                                {
                                    label: "Disposal",
                                    value: "Disposal"
                                },
                                {
                                    label: "DSL Ready",
                                    value: "DSL Ready"
                                },
                                {
                                    label: "Extra Storage",
                                    value: "Extra Storage"
                                },
                                {
                                    label: "Fully Equipped Kitchen",
                                    value: "Fully Equipped Kitchen"
                                },
                                {
                                    label: "Internet Access",
                                    value: "Internet Access"
                                },
                                {
                                    label: "Large Closet Space",
                                    value: "Large Closet Space"
                                },
                                {
                                    label: "Primary Bedrooms",
                                    value: "Primary Bedrooms"
                                },
                                {
                                    label: "Microwave",
                                    value: "Microwave"
                                },
                                {
                                    label: "Non-Smoking Units",
                                    value: "Non-Smoking Units"
                                },
                                {
                                    label: "Pantry Space",
                                    value: "Pantry Space"
                                },
                                {
                                    label: "Patio or Balcony",
                                    value: "Patio or Balcony"
                                },
                                {
                                    label: "Security Monitor",
                                    value: "Security Monitor"
                                },
                                {
                                    label: "Spacious Bedrooms",
                                    value: "Spacious Bedrooms"
                                },
                                {
                                    label: "Tile Floors",
                                    value: "Tile Floors"
                                },
                                {
                                    label: "Vaulted Ceilings",
                                    value: "Vaulted Ceilings"
                                },
                                {
                                    label: "Walk-In Closets",
                                    value: "Walk-In Closets"
                                },
                                {
                                    label: "Washer & Dryer In Unit",
                                    value: "Washer Dryer In Unit"
                                },
                                {
                                    label: "Window Blinds",
                                    value: "Window Blinds"
                                },
                                {
                                    label: "Walk In Shower",
                                    value: "Walk In Shower"
                                },
                            ]
                        }
                    ]
                },
                {
                    name: "community_amenities",
                    label: "Community Amenities",
                    type: "group",
                    fields: [
                        {
                            name: "items",
                            type: "select",
                            hasMany: true,
                            options: [
                                "Accepts Electronic Payments",
                                "Basketball Court",
                                "Business Center/Media Room",
                                "Close to Public Transportation",
                                "Club House/Community Room",
                                "Community Patio",
                                "Controlled Access",
                                "Corporate/Guest Suite",
                                "Dog Park",
                                "Elevator",
                                "Fitness Center",
                                "Maintenance (24hr Emergency)",
                                "Non-Smoking Buildings",
                                "Handicap Units",
                                "Laundry Facilities",
                                "Lawn Care",
                                "Maintenance (on-site)",
                                "Management (on-site)",
                                "Near Bike Trails",
                                "Near Shopping, Dining, and Entertainment",
                                "Non-Smoking Community",
                                "Playground",
                                "Pool",
                                "Professionally Landscaped",
                                "Snow Removal",
                                "Storage Space Available",
                                "Courtyard",
                            ]
                        }
                    ]
                },
                {
                    name: "utilities_included",
                    label: "Utilities Included",
                    type: "group",
                    fields: [
                        {
                            name: "items",
                            type: "select",
                            hasMany: true,
                            options: [
                                "Electric",
                                "Internet",
                                "Garbage",
                                "Heat",
                                "Sewer",
                                "Water"
                            ]
                        }
                    ]
                },
                {
                    name: "parking_options",
                    label: "Parking Options",
                    type: "group",
                    fields: [
                        {
                            name: "items",
                            type: "select",
                            hasMany: true,
                            options: [
                                "Garage Available",
                                "Off Street Parking",
                            ]
                        }
                    ]
                },
                {
                    name: "pets",
                    type: "group",
                    fields: [
                        {
                            name: "items",
                            type: "select",
                            hasMany: true,
                            options: [
                                "Cats Allowed",
                                "Dogs Allowed",
                            ]
                        }
                    ]
                },
                {
                    name: "lease_options",
                    label: "Lease Options",
                    type: "group",
                    fields: [
                        {
                            name: "items",
                            type: "select",
                            hasMany: true,
                            options: [
                                "12 Month",
                                "6 Month",
                            ]
                        }
                    ]
                },
                {
                    name: "floorplans",
                    type: "array",
                    fields: [
                        {
                            name: "beds",
                            type: "number"
                        },
                        {
                            name: "bath",
                            type: "number"
                        },
                        {
                            name: "starting_at",
                            label: "starting at",
                            type: "number",
                        },
                        {
                            name: "sq_ft",
                            label: "sq. ft",
                            type: "number",
                        }
                    ]
                },
                {
                    name: "additional_information",
                    label: "Additional Information",
                    type: "group",
                    fields: [
                        {
                            name: "description",
                            type: "textarea",
                        },
                        {
                            name: "application_fee",
                            label: "Application Fee",
                            type: "text",
                        },
                        {
                            name: "security_deposit",
                            label: "Security Deposit",
                            type: "text",
                        },
                        {
                            name: "pet_deposit",
                            label: "Pet Deposit",
                            type: "text"
                        },
                        {
                            name: "pet_rent",
                            label: "Pet rent",
                            type: "number"
                        }
                    ]
                }
            ]
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
        },
        {
            name: "longitude",
            type: "text",
        },
        {
            name: "contact_phone",
            label: "Contact Phone",
            type: "text",
            admin: {
                position: "sidebar"
            }
        },
        {
            name: "contact_email",
            label: "Contact Email",
            type: "email",
            admin: {
                position: "sidebar"
            }
        }
    ]
}
