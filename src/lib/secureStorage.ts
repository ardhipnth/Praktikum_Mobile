import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

export const ExpoSecureStoreAdapter = {
    getItem: async (key: string): Promise<string | null> => {
        if (isWeb) {
            return typeof localStorage !== "undefined" ? localStorage.getItem(key) : null;
        }
        return SecureStore.getItemAsync(key);
    },
    setItem: async (key: string, value: string): Promise<void> => {
        if (isWeb) {
            if (typeof localStorage !== "undefined") localStorage.setItem(key, value);
            return;
        }
        await SecureStore.setItemAsync(key, value);
    },
    removeItem: async (key: string): Promise<void> => {
        if (isWeb) {
            if (typeof localStorage !== "undefined") localStorage.removeItem(key);
            return;
        }
        await SecureStore.deleteItemAsync(key);
    },
};