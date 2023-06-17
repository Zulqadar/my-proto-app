import { UserState } from "../store/features/user/user-slice"
import { getDataAsync, removeDataAsync, storeDataAsync } from "./async-storage"

const USER_KEYS = {
    UserDetals: 'UserDetails'
}

export const storeUserDetailsAsync = async (userDetals: UserState) => {
    await storeDataAsync(USER_KEYS.UserDetals, userDetals);
}

export const getUserDetailsAsync = async () => {
    return await getDataAsync(USER_KEYS.UserDetals);
}

export const removeUserDetailsAsync = async () => {
    await removeDataAsync(USER_KEYS.UserDetals);
}