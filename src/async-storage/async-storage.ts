import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeDataAsync = async (key: string, value: any) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.log(error);
    }
};

export const getDataAsync = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return JSON.parse(value);
        }
    } catch (error) {
        console.log(error);
    }
};

export const removeDataAsync = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log(error);
    }
};