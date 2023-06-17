import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getAuthDetailsAsync, getUserDetailsAsync, removeAuthDetailsAsync, removeUserDetailsAsync, storeAuthDetailsAsync } from '../../../async-storage';
import { AuthState } from './auth-slice';
import { UserState } from '../user/user-slice';

interface AuthToken {
    authDetails?: AuthState
    userDetals?: UserState
    isTokenValid: boolean
}

const removeStorageDetailsAsync = async () => {
    await removeAuthDetailsAsync();
    await removeUserDetailsAsync();
}

export const checkAuthToken = async (): Promise<AuthToken> => {
    const defaultResult: AuthToken = {
        authDetails: undefined,
        userDetals: undefined,
        isTokenValid: false
    };

    try {
        const authDetails = await getAuthDetailsAsync();
        const userDetals = await getUserDetailsAsync();
        if (authDetails && authDetails.loginMode === 'Facebook') {
            const storedToken = authDetails?.accessToken;
            const currentToken = await AccessToken.getCurrentAccessToken();

            // Check if the stored token is valid and has not expired
            if (storedToken && currentToken && storedToken === currentToken.accessToken) {
                return {
                    authDetails: authDetails,
                    userDetals: userDetals,
                    isTokenValid: true
                }; //User is still valid
            } else {

                // If the stored token is expired, try login silently
                try {
                    await AccessToken.refreshCurrentAccessTokenAsync();
                    const _accessTokenData = await AccessToken.getCurrentAccessToken();
                    const _authDetails: AuthState = {
                        ...authDetails,
                        accessToken: _accessTokenData?.accessToken,
                        userID: _accessTokenData?.userID
                    };
                    await storeAuthDetailsAsync(_authDetails);
                    return {
                        authDetails: _authDetails,
                        isTokenValid: true,
                        userDetals: userDetals
                    }
                } catch (error: any) {
                    await removeStorageDetailsAsync();
                    await LoginManager.logOut();
                    return defaultResult;
                }
            }
        } else if (authDetails && authDetails.loginMode === 'Google') {
            const storedToken = authDetails?.accessToken;
            const { idToken, accessToken } = await GoogleSignin.getTokens();

            // Check if the stored token is valid and has not expired
            if (storedToken && accessToken && storedToken === accessToken) {
                return {
                    authDetails: authDetails,
                    userDetals: userDetals,
                    isTokenValid: true
                };
            } else {
                // If the stored token is expired, try login silently
                const response = await GoogleSignin.signInSilently();
                if (response && response.serverAuthCode === 'SIGN_IN_REQUIRED') {
                    await removeStorageDetailsAsync();
                    await GoogleSignin.signOut();
                    return defaultResult;
                } else {
                    const { idToken: _idToken, accessToken: _accessToken } = await GoogleSignin.getTokens();
                    const _authDetails = {
                        ...authDetails,
                        accessToken: _accessToken,
                        idToken: _idToken
                    };
                    await storeAuthDetailsAsync(_authDetails);
                    return {
                        authDetails: _authDetails,
                        isTokenValid: true,
                        userDetals: userDetals
                    }
                }
            }
        } else {
            await removeStorageDetailsAsync();
            await LoginManager.logOut();
            await GoogleSignin.signOut();
            return defaultResult;
        }
    } catch (error) {
        console.log('Error checking auth token:', error);
        return defaultResult;
    }
};