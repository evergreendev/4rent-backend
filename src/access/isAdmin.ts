import {Access} from "payload/config";
import {FieldAccess} from "payload/types";
import {User} from "payload/generated-types";

export const isAdmin = (): Access => ({req: {user}}) => {

    return Boolean(user?.role === "admin");
}

export const isAdminFieldLevel: FieldAccess<{id: string}, unknown, User> = ({req: {user}}) => {

    return Boolean(user?.role === "admin");
}
