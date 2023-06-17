import { AuthState } from "../store/features/auth/auth-slice"
import { getDataAsync, removeDataAsync, storeDataAsync } from "./async-storage"

const AUTH_KEYS = {
    AuthDetails: 'AuthDetails'
}

export const storeAuthDetailsAsync = async (authDetails: AuthState) => {
    await storeDataAsync(AUTH_KEYS.AuthDetails, authDetails);
}

export const getAuthDetailsAsync = async (): Promise<AuthState> => {
    return await getDataAsync(AUTH_KEYS.AuthDetails);
}

export const removeAuthDetailsAsync = async () => {
    await removeDataAsync(AUTH_KEYS.AuthDetails);
}