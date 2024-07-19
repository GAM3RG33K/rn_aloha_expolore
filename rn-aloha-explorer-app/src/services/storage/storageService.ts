import AsyncStorage from '@react-native-async-storage/async-storage';

export const setData = async (key: string, value: any) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getData = async (key: string) => {
    const data = await AsyncStorage.getItem(key);
    if (!data) return null;

    try {
        return JSON.parse(data);
    } catch (e) {
        return data;
    }
};
