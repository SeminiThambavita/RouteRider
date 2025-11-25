import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { RootState } from "../store";
import { setAuthState } from "../store/slices/authSlice";
import { setFavorites } from "../store/slices/transportSlice";
import { persistenceService } from "../services/persistence/persistenceService";

const LoadingScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      // Load saved favorites
      const savedFavorites = await persistenceService.loadFavorites();
      dispatch(setFavorites(savedFavorites));

      // For demo purposes, we'll auto-login or go to auth
      // In a real app, you would check for valid auth token here
      setTimeout(() => {
        if (isAuthenticated) {
          navigation.navigate("Main" as never);
        } else {
          navigation.navigate("Auth" as never);
        }
      }, 1000);
      
    } catch (error) {
      console.error("Error checking auth state:", error);
      navigation.navigate("Auth" as never);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>RouteRider</Text>
      <Text style={styles.subtext}>Loading your experience...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007AFF",
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: "white",
    opacity: 0.8,
  },
});

export default LoadingScreen;
