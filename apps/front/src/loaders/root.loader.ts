import { usersApi } from "~/services"

export const rootLoader = async () => {
    return usersApi.getCurrentUser()
}