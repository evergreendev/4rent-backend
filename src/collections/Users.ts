import { CollectionConfig } from 'payload/types'
import {isAdminFieldLevel} from "../access/isAdmin";

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: ({req : {user}}) => {
      if(user.role === "admin"){
        return true
      }
      return {
        id: {
          equals: user.id
        },
      }
    }
  },
  fields: [
    {
      name: "role",
      type: "select",
      options: [
          "admin",
        {label: "Apartment Manager", value: "apartment-manager"}
      ],
      access: {
        update: isAdminFieldLevel
      },
    },
    {
      name: "listing_access",
      label: "Has access to the following listings:",
      saveToJWT: true,
      type: "relationship",
      relationTo: "listings",
      access: {
        update: isAdminFieldLevel
      },
      hasMany: true,
      admin: {
        condition:(data, siblingData) => {
          return siblingData.role === "apartment-manager";
        }
      }
    }
    // Email added by default
    // Add more fields as needed
  ],
}

export default Users
