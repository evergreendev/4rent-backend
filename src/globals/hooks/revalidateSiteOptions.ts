import {GlobalAfterChangeHook} from 'payload/types'

import {revalidate} from '../../utilities/revalidate'

// Revalidate the page in the background, so the user doesn't have to wait
// Notice that the hook itself is not async, and we are not awaiting `revalidate`
// Only revalidate existing docs that are published
// Don't scope to `operation` in order to purge static demo pages
export const revalidateSiteOptions: GlobalAfterChangeHook = ({doc, previousDoc, req: {payload}}) => {
    revalidate({payload, collection: 'siteOptions', slug: ""})

    return doc
}
