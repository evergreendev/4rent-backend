import { CollectionConfig } from 'payload/types'

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
        update: ({req : {user}}) => {
          return user.role === "admin"
        }
      },
    },
    {
      name: "listing_access",
      label: "Has access to the following listings:",
      type: "relationship",
      relationTo: "listings",
      hasMany: true,
      access: {
        update: ({req : {user}}) => {
          return user.role === "admin"
        }
      },
      admin: {
        condition:(data, siblingData, { user, }) => {
          return siblingData.role === "apartment-manager";
        }
      }
    }
    // Email added by default
    // Add more fields as needed
  ],
}

export default Users
