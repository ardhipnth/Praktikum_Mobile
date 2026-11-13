import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "favorites";

export const getFavorites = async (): Promise<string[]> => {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
};

export const isFavorite = async (id: string): Promise<boolean> => {
    const favorites = await getFavorites();
    return favorites.includes(id);
};

export const toggleFavorite = async (id: string): Promise<boolean> => {
    const favorites = await getFavorites();
    const exists = favorites.includes(id);
    const updated = exists ? favorites.filter((f) => f !== id) : favorites.concat(id);
    await AsyncStorage.setItem(KEY, JSON.stringify(updated));
    return !exists;
};
