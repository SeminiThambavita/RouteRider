import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { logout } from "../store/slices/authSlice";
import HomeScreen from "../screens/main/HomeScreen";
import FavoritesScreen from "../screens/main/FavoritesScreen";
import DetailsScreen from "../screens/details/DetailsScreen";
import ProfileScreen from "../screens/main/ProfileScreen";
import { useTheme } from "../styles/ThemeContext";
import { Home, Star, User, MapPin, Heart } from "react-feather";

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const FavoritesStack = createStackNavigator();

// Home Stack Navigator
const HomeStackNavigator: React.FC = () => {
  const { theme } = useTheme();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme === "dark" ? "#1a1a1a" : "#007AFF",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <HomeStack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ 
          title: "RouteRider",
          headerRight: () => (
            <MapPin 
              size={24} 
              color="#fff" 
              style={{ marginRight: 15 }} 
            />
          )
        }}
      />
      <HomeStack.Screen 
        name="Details" 
        component={DetailsScreen}
        options={{ title: "Transport Details" }}
      />
    </HomeStack.Navigator>
  );
};

// Favorites Stack Navigator
const FavoritesStackNavigator: React.FC = () => {
  const { theme } = useTheme();
  return (
    <FavoritesStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme === "dark" ? "#1a1a1a" : "#007AFF",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <FavoritesStack.Screen 
        name="Favorites" 
        component={FavoritesScreen}
        options={{ 
          title: "My Favorites",
          headerRight: () => (
            <Heart 
              size={24} 
              color="#fff" 
              style={{ marginRight: 15 }} 
            />
          )
        }}
      />
      <FavoritesStack.Screen 
        name="Details" 
        component={DetailsScreen}
        options={{ title: "Transport Details" }}
      />
    </FavoritesStack.Navigator>
  );
};

const MainNavigator: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStackNavigator}
        options={{ 
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="FavoritesTab" 
        component={FavoritesStackNavigator}
        options={{ 
          title: "Favorites",
          tabBarIcon: ({ color, size, focused }) => (
            <Star size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen}
        options={{ 
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
