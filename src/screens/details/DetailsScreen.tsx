import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../styles/ThemeContext";
import { addToFavorites, removeFromFavorites } from "../../store/slices/transportSlice";
import { RootState } from "../../store";
import { transportApi } from "../../services/api/transportApi";
import { TransportItem } from "../../types";

const DetailsScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { favorites } = useSelector((state: RootState) => state.transport);
  
  const [transportItem, setTransportItem] = useState<TransportItem | null>(null);
  const { transportItem: initialItem } = route.params as { transportItem: TransportItem };

  useEffect(() => {
    if (initialItem) {
      setTransportItem(initialItem);
    }
  }, [initialItem]);

  const toggleFavorite = () => {
    if (transportItem) {
      if (favorites.includes(transportItem.id)) {
        dispatch(removeFromFavorites(transportItem.id));
      } else {
        dispatch(addToFavorites(transportItem.id));
      }
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "On Time": return styles.statusOnTime;
      case "Delayed": return styles.statusDelayed;
      case "Cancelled": return styles.statusCancelled;
      default: return styles.statusOnTime;
    }
  };

  if (!transportItem) {
    return (
      <View style={[styles.container, styles.center, theme === "dark" && styles.containerDark]}>
        <Text style={[styles.loadingText, theme === "dark" && styles.textDark]}>
          Loading transport details...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, theme === "dark" && styles.containerDark]}>
      {transportItem.image && (
        <Image source={{ uri: transportItem.image }} style={styles.image} />
      )}
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.transportType, theme === "dark" && styles.textDark]}>
              {transportItem.type.toUpperCase()}
            </Text>
            <Text style={[styles.transportNumber, theme === "dark" && styles.textDark]}>
              {transportItem.number}
            </Text>
          </View>
          <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
            <Text style={[styles.favoriteIcon, favorites.includes(transportItem.id) && styles.favoriteActive]}>
              {favorites.includes(transportItem.id) ? "♥" : "♡"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.detailSection}>
          <Text style={[styles.destination, theme === "dark" && styles.textDark]}>
            To: {transportItem.destination}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={[styles.label, theme === "dark" && styles.textDark]}>Departure Time:</Text>
          <Text style={[styles.value, theme === "dark" && styles.textDark]}>{transportItem.departureTime}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={[styles.label, theme === "dark" && styles.textDark]}>Status:</Text>
          <View style={[styles.status, getStatusStyle(transportItem.status)]}>
            <Text style={styles.statusText}>{transportItem.status}</Text>
            {transportItem.delay > 0 && (
              <Text style={styles.delayText}>(+{transportItem.delay}min)</Text>
            )}
          </View>
        </View>

        {transportItem.platform && (
          <View style={styles.detailRow}>
            <Text style={[styles.label, theme === "dark" && styles.textDark]}>Platform:</Text>
            <Text style={[styles.value, theme === "dark" && styles.textDark]}>{transportItem.platform}</Text>
          </View>
        )}

        <View style={styles.detailRow}>
          <Text style={[styles.label, theme === "dark" && styles.textDark]}>Transport Type:</Text>
          <Text style={[styles.value, theme === "dark" && styles.textDark]}>{transportItem.type}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={[styles.infoTitle, theme === "dark" && styles.textDark]}>Travel Information</Text>
          <Text style={[styles.infoText, theme === "dark" && styles.textDark]}>
            Please arrive at the platform 2-3 minutes before departure time. 
            Keep your ticket ready for inspection.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  containerDark: {
    backgroundColor: "#1a1a1a",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  image: {
    width: "100%",
    height: 200,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  transportType: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 4,
  },
  transportNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  favoriteButton: {
    padding: 8,
  },
  favoriteIcon: {
    fontSize: 28,
    color: "#ccc",
  },
  favoriteActive: {
    color: "#FF3B30",
  },
  detailSection: {
    marginBottom: 20,
  },
  destination: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusOnTime: {
    backgroundColor: "#d4edda",
  },
  statusDelayed: {
    backgroundColor: "#fff3cd",
  },
  statusCancelled: {
    backgroundColor: "#f8d7da",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 4,
  },
  delayText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  infoBox: {
    backgroundColor: "#e3f2fd",
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666",
  },
  textDark: {
    color: "#fff",
  },
});

export default DetailsScreen;
