import {Access} from "payload/config";

export const isAdminOrHasCompanyAccessOrIsPublished = (): Access => ({req: {user}}) => {
    if (user) {
        if (user.role === "admin") return true;

        const ids = user.company_access.map((listing: { id: any; }) => listing.id);

        if (user.company_access?.length > 0) {

            return {
                "id": {
                    in: ids
                }
            }
        }


    }

    return {
        _status: {
            equals: 'published',
        },
    }
}
