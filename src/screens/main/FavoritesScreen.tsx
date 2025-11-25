import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../styles/ThemeContext";
import { RootState } from "../../store";
import { TransportItem } from "../../types";
import { Feather } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";

// Define navigation types
type RootStackParamList = {
  Details: { transportItem: TransportItem };
};

type FavoritesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

const FavoritesScreen: React.FC = () => {
  const navigation = useNavigation<FavoritesScreenNavigationProp>();
  const { theme } = useTheme();
  const { items, favorites } = useSelector((state: RootState) => state.transport);

  const favoriteItems = items.filter(item => favorites.includes(item.id));

  const handleItemPress = (item: TransportItem) => {
    navigation.navigate("Details", { transportItem: item });
  };

  const renderFavoriteItem = ({ item }: { item: TransportItem }) => (
    <TouchableOpacity 
      style={[styles.card, theme === "dark" && styles.cardDark]}
      onPress={() => handleItemPress(item)}
    >
      <View style={styles.cardContent}>
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.image} />
        )}
        <View style={styles.details}>
          <View style={styles.transportInfo}>
            <Text style={[styles.transportType, theme === "dark" && styles.textDark]}>
              {item.type.toUpperCase()}
            </Text>
            <Text style={[styles.transportNumber, theme === "dark" && styles.textDark]}>
              {item.number}
            </Text>
          </View>
          <Text style={[styles.destination, theme === "dark" && styles.textDark]}>
            To: {item.destination}
          </Text>
          <Text style={[styles.departure, theme === "dark" && styles.textDark]}>
            Departs: {item.departureTime}
          </Text>
          <Text style={[styles.status, getStatusStyle(item.status)]}>
            {item.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "On Time": return styles.statusOnTime;
      case "Delayed": return styles.statusDelayed;
      case "Cancelled": return styles.statusCancelled;
      default: return styles.statusOnTime;
    }
  };

  if (favoriteItems.length === 0) {
    return (
      <View style={[styles.container, styles.center, theme === "dark" && styles.containerDark]}>
        <Feather name="heart" size={64} color="#ccc" />
        <Text style={[styles.emptyTitle, theme === "dark" && styles.textDark]}>
          No Favorites Yet
        </Text>
        <Text style={[styles.emptyText, theme === "dark" && styles.textDark]}>
          Tap the heart icon on transport items to add them to favorites
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, theme === "dark" && styles.containerDark]}>
      <Text style={[styles.title, theme === "dark" && styles.textDark]}>
        My Favorite Routes ({favoriteItems.length})
      </Text>
      <FlatList
        data={favoriteItems}
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  containerDark: {
    backgroundColor: "#1a1a1a",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardDark: {
    backgroundColor: "#2d2d2d",
  },
  cardContent: {
    flexDirection: "row",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  transportInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  transportType: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#007AFF",
    marginRight: 8,
  },
  transportNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  destination: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  departure: {
    fontSize: 14,
    marginBottom: 6,
    color: "#666",
  },
  status: {
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  statusOnTime: {
    backgroundColor: "#d4edda",
    color: "#155724",
  },
  statusDelayed: {
    backgroundColor: "#fff3cd",
    color: "#856404",
  },
  statusCancelled: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
  },
  textDark: {
    color: "#fff",
  },
});

export default FavoritesScreen;