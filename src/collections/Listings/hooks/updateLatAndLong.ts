import type {BeforeChangeHook} from 'payload/dist/collections/config/types'

export const updateLatAndLong: BeforeChangeHook = async ({data, operation, originalDoc}) => {
    if (operation === "create" || data.street !== originalDoc?.street
        || data.city !== originalDoc?.city
        || data.state !== originalDoc?.state
        || data.zip !== originalDoc?.zip) {

        if (!data.city || !data.street || !data.state || !data.zip) return data;

        try {
            const res = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/listings/address-search`, {
                body: JSON.stringify({"address": data.street + " " + data.city + " " + data.state + " " + data.zip}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
            });
            const json = await res.json();


            if (json.addresses[0].confidence === "exact" && (json.addresses[0].latitude !== data.latitude || json.addresses[0].longitude === data.longitude)) {

                return {
                    ...data,
                    latitude: json.addresses[0].latitude,
                    longitude: json.addresses[0].longitude
                }
            }

            return data

        } catch (e) {
            console.log(e);
            return data
        }

    }

    return data
}
