import {Access} from "payload/config";

export const isAdminOrHasListingAccess = (): Access => ({req: {user}}) => {
    if (user) {
        if (user.role === "admin") return true;

        const ids = user.listing_access.map((listing: { id: any; }) => listing.id);

        if (user.listing_access?.length > 0) {
            return {
                "id": {
                    in: ids
                }
            }
        }


    }

    return false;
}
