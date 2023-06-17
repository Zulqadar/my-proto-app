import { FC, useEffect, useState } from "react";
import { StyleSheet, View, Animated, StatusBar } from "react-native";
import { COLOR_CONSTRAINTS } from "../../constraint";
import { checkAuthToken } from "../../store/features/auth";
import { useAppDispatch } from "../../hooks";
import { setAuthDetails } from "../../store/features/auth/auth-slice";
import { setUser } from "../../store/features/user/user-slice";

export const SplashScreen: FC<{ navigation: any }> = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const [isVisible, setIsVisible] = useState(true);
    const [backgroundColor, _setBackgroundColor] = useState(new Animated.Value(0));
    const [bounce, _setBounce] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.parallel([
            Animated.timing(backgroundColor, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false
            }),
            Animated.spring(bounce, {
                toValue: 1,
                friction: 1,
                tension: 10,
                useNativeDriver: false
            })
        ]).start(() => {
            setIsVisible(false);

            checkAuthToken().then(({ isTokenValid, authDetails, userDetals: userData }) => {
                if (isTokenValid) {
                    dispatch(setAuthDetails({
                        accessToken: authDetails?.accessToken,
                        loginMode: authDetails?.loginMode,
                        idToken: authDetails?.idToken,
                        userID: authDetails?.userID
                    }));

                    dispatch(setUser({
                        name: userData?.name,
                        pictureUrl: userData?.pictureUrl,
                        userId: userData?.userId
                    }));

                    navigation.navigate('Home');
                } else {
                    navigation.navigate('Login');
                }
            })

        });

        return () => {
            backgroundColor.stopAnimation();
            bounce.stopAnimation();
        };
    }, []);

    const interpolatedColor = backgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: [COLOR_CONSTRAINTS.primary_bg, COLOR_CONSTRAINTS.secondary_bg],
    });

    const interpolatedBounce = bounce.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 30],
    });

    return (
        <Animated.View style={{ ...styles.container, backgroundColor: interpolatedColor }}>
            <StatusBar hidden={true} translucent={true} backgroundColor={COLOR_CONSTRAINTS.secondary_bg} />
            {isVisible && (
                <View style={styles.textContainer}>
                    <Animated.Text style={{ ...styles.text, transform: [{ translateY: interpolatedBounce }] }}>
                        Proto
                    </Animated.Text>
                </View>
            )}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -100
    },
    text: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'JosefinSans-Regular'
    },
});
