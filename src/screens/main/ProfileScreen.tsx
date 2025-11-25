import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../styles/ThemeContext";
import { logout } from "../../store/slices/authSlice";
import { RootState } from "../../store";
import { Feather } from "@expo/vector-icons";

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();
  const { user } = useSelector((state: RootState) => state.auth);
  const { favorites } = useSelector((state: RootState) => state.transport);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={[styles.container, theme === "dark" && styles.containerDark]}>
      <View style={styles.header}>
        <Text style={[styles.title, theme === "dark" && styles.textDark]}>Profile</Text>
      </View>

      <View style={styles.userInfo}>
        <View style={styles.avatar}>
          <Feather name="user" size={32} color="white" />
        </View>
        <Text style={[styles.userName, theme === "dark" && styles.textDark]}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={[styles.userEmail, theme === "dark" && styles.textDark]}>
          {user?.email}
        </Text>
        <Text style={[styles.userUsername, theme === "dark" && styles.textDark]}>
          @{user?.username}
        </Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Feather name="star" size={24} color={theme === "dark" ? "#fff" : "#007AFF"} />
          <Text style={[styles.statNumber, theme === "dark" && styles.textDark]}>
            {favorites.length}
          </Text>
          <Text style={[styles.statLabel, theme === "dark" && styles.textDark]}>
            Favorite Routes
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={[styles.themeButton, theme === "dark" && styles.themeButtonDark]}
          onPress={toggleTheme}
        >
          {theme === "dark" ? (
            <Feather name="sun" size={20} color="#666" />
          ) : (
            <Feather name="moon" size={20} color="#666" />
          )}
          <Text style={styles.themeButtonText}>
            {theme === "dark" ? " Light Mode" : " Dark Mode"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Feather name="log-out" size={20} color="white" />
          <Text style={styles.logoutButtonText}> Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  containerDark: {
    backgroundColor: "#1a1a1a",
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  userInfo: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 4,
    color: "#666",
  },
  userUsername: {
    fontSize: 14,
    color: "#888",
  },
  stats: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  statItem: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
    color: "#333",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  actions: {
    gap: 12,
  },
  themeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    gap: 8,
  },
  themeButtonDark: {
    backgroundColor: "#2d2d2d",
    borderColor: "#444",
  },
  themeButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF3B30",
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  textDark: {
    color: "#fff",
  },
});

export default ProfileScreen;