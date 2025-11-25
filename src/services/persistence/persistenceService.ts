import AsyncStorage from "@react-native-async-storage/async-storage";

const PERSISTENCE_KEYS = {
  FAVORITES: "@RouteRider_favorites",
  AUTH_TOKEN: "@RouteRider_authToken",
  THEME: "@RouteRider_theme",
} as const;

export const persistenceService = {
  // Favorites
  saveFavorites: async (favorites: string[]): Promise<void> => {
    try {
      await AsyncStorage.setItem(PERSISTENCE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  },

  loadFavorites: async (): Promise<string[]> => {
    try {
      const favorites = await AsyncStorage.getItem(PERSISTENCE_KEYS.FAVORITES);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error("Failed to load favorites:", error);
      return [];
    }
  },

  // Auth Token
  saveAuthToken: async (token: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(PERSISTENCE_KEYS.AUTH_TOKEN, token);
    } catch (error) {
      console.error("Failed to save auth token:", error);
    }
  },

  loadAuthToken: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(PERSISTENCE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error("Failed to load auth token:", error);
      return null;
    }
  },

  removeAuthToken: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(PERSISTENCE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error("Failed to remove auth token:", error);
    }
  },

  // Theme
  saveTheme: async (theme: "light" | "dark"): Promise<void> => {
    try {
      await AsyncStorage.setItem(PERSISTENCE_KEYS.THEME, theme);
    } catch (error) {
      console.error("Failed to save theme:", error);
    }
  },

  loadTheme: async (): Promise<"light" | "dark"> => {
    try {
      const theme = await AsyncStorage.getItem(PERSISTENCE_KEYS.THEME);
      return (theme as "light" | "dark") || "light";
    } catch (error) {
      console.error("Failed to load theme:", error);
      return "light";
    }
  },

  // Clear all data (for logout)
  clearAll: async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove(Object.values(PERSISTENCE_KEYS));
    } catch (error) {
      console.error("Failed to clear all data:", error);
    }
  },
};
