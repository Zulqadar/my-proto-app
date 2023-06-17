import React, { useEffect } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { Text } from 'react-native-paper';
import { LoginManager, GraphRequest, GraphRequestManager, AccessToken } from 'react-native-fbsdk'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

import { COLOR_CONSTRAINTS } from '../../constraint';
import { FacebookLoginButton, GoogleLoginButton } from '../../components/buttons';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { UserState, selectUser, setUser } from '../../store/features/user/user-slice';
import { AuthState, setAuthDetails } from '../../store/features/auth/auth-slice';
import { storeAuthDetailsAsync, storeUserDetailsAsync } from '../../async-storage';

export interface LoginScreenProps {
    navigation?: any
}

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
    const userDetails = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackPress
        );

        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        GoogleSignin.configure();
    }, [])

    useEffect(() => {
        if (userDetails && userDetails.userId !== '') {
            navigation.navigate('Home');
        }
    }, [userDetails])

    const handleBackPress = () => {
        BackHandler.exitApp();
        return true;
    };

    const googleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userData = await GoogleSignin.signIn();
            const { accessToken, idToken } = await GoogleSignin.getTokens();
            const _authDetails: AuthState = {
                accessToken: accessToken,
                loginMode: 'Google',
                idToken: idToken
            };

            const _userDetails: UserState = {
                name: userData?.user?.name || '',
                pictureUrl: userData?.user?.photo || '',
                userId: userData?.user?.id
            }

            //storing the auth details to async-storage
            storeAuthDetailsAsync(_authDetails);
            storeUserDetailsAsync(_userDetails);

            //storing the auth details to redux store
            dispatch(setAuthDetails(_authDetails));
            dispatch(setUser(_userDetails));
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.log('error1: ', error)
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                console.log('error2: ', error)
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.log('error3: ', error)
            } else {
                // some other error happened
                console.log('error4: ', error)
            }
        }
    };

    const fbLogin = (resCallBack: any) => {
        LoginManager.logOut();
        return LoginManager.logInWithPermissions(['email', 'public_profile']).then(
            result => {
                if (result.declinedPermissions && result.declinedPermissions.includes('email')) {
                    resCallBack({
                        message: 'Email is required!'
                    })
                }

                if (result.isCancelled) {
                    console.log('Error')
                } else {
                    AccessToken.getCurrentAccessToken().then((data) => {
                        const authDetails: AuthState = {
                            accessToken: data ? data.accessToken : '',
                            loginMode: 'Facebook',
                            userID: data ? data.userID : ''
                        };

                        //storing the auth details to async-storage
                        storeAuthDetailsAsync(authDetails);

                        //storing the auth details to redux store
                        dispatch(setAuthDetails(authDetails));
                    })

                    const infoRequest = new GraphRequest(
                        'me?fields=email,name,picture',
                        null,
                        resCallBack
                    );

                    new GraphRequestManager().addRequest(infoRequest).start();
                }
            },
            function (error) {
                console.log('Login fails with error: ', error);
            }
        )
    }

    const _responseCallBack = async (error: any, result: any) => {
        if (error) {
            console.log('Error: ', error);
            return;
        } else {
            const userData = result;
            const _userDetails: UserState = {
                name: userData?.name || '',
                pictureUrl: userData?.picture?.data?.url || '',
                userId: userData?.id
            }

            //storing the user details to storage
            storeUserDetailsAsync(_userDetails);

            //storing the user details in store
            dispatch(setUser(_userDetails));
        }
    }

    const handleFacebookLoginPress = async () => {
        try {
            await fbLogin(_responseCallBack);
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Login</Text>
            <FacebookLoginButton onPress={handleFacebookLoginPress} />
            <GoogleLoginButton onPress={googleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR_CONSTRAINTS.secondary_bg,
        padding: 16,
        marginTop: -50
    },
    input: {
        width: '100%',
        marginBottom: 16,
        backgroundColor: 'transparent',
    },
    headline: {
        color: '#ffffff',
        fontSize: 40
    },
    text: {
        color: '#ffffff',
        fontSize: 30
    }
});
