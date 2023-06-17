import * as React from 'react';
import { BackHandler, SafeAreaView, StyleSheet } from 'react-native';
import DashboardScreen from '../dashboard/dashboard';
import { useRoute } from '@react-navigation/native';

export interface HomeScreenProps {
    navigation?: any
}

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
    const { name: routeName } = useRoute();

    const handleBackPress = () => {
        console.log('name: ', routeName)
        if (navigation.isFocused() && routeName === 'Home') {
            BackHandler.exitApp();
            return true;
        }
        else if (navigation.isFocused() && navigation.canGoBack()) {
            navigation.goBack();
            return true;
        }
        else if (navigation.isFocused() && !navigation.canGoBack()) {
            BackHandler.exitApp();
            return true;
        }
    };

    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DashboardScreen navigation={navigation} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
});
