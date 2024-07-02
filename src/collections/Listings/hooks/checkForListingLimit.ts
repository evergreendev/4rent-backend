import {CollectionBeforeChangeHook} from "payload/types";
import {Company} from "payload/generated-types";

export const checkForListingLimit: CollectionBeforeChangeHook = async ({data, req: {payload,user}}) => {

    if (!data.company || data._status === "draft") {
        return data;
    }

    const listings = await payload.find({
        user: user,
        collection: "listings",
        pagination: false
    })

    const listingsInCompany = listings.docs.filter(listing => {
        return (listing.company as Company)?.id === data.company && listing._status === "published"
    });

    const listingLimit = (listingsInCompany[0]?.company as Company)?.listing_limit;

    if (listingsInCompany.length >= listingLimit){
        return {
            ...data,
            _status: 'draft',
        }
    }

    return data;
}
