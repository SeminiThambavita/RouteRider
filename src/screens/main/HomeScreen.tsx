import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Image, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../styles/ThemeContext";
import { setTransportItems, setLoading, addToFavorites, removeFromFavorites } from "../../store/slices/transportSlice";
import { RootState } from "../../store";
import { transportApi } from "../../services/api/transportApi";
import { TransportItem } from "../../types";
import SearchHeader from "../../components/transport/SearchHeader";

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { items, loading, favorites } = useSelector((state: RootState) => state.transport);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    transportType: "all",
    status: "all",
  });

  useEffect(() => {
    loadTransportData();
  }, []);

  const loadTransportData = async () => {
    dispatch(setLoading(true));
    try {
      const transportData = await transportApi.getTransportSchedule();
      dispatch(setTransportItems(transportData));
    } catch (error) {
      console.error("Failed to load transport data:", error);
      Alert.alert(
        "Connection Error", 
        "Unable to load transport schedules. Please check your connection and try again.",
        [{ text: "Try Again", onPress: loadTransportData }]
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Filter transport items based on search and filters
  const filteredItems = items.filter((item) => {
    // Search filter
    const matchesSearch = 
      searchQuery === "" ||
      item.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase());

    // Transport type filter
    const matchesType = 
      filters.transportType === "all" || 
      item.type === filters.transportType;

    // Status filter
    const matchesStatus = 
      filters.status === "all" || 
      item.status === filters.status;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleItemPress = (item: TransportItem) => {
    navigation.navigate("Details" as never, { transportItem: item });
  };

  const toggleFavorite = (itemId: string) => {
    if (favorites.includes(itemId)) {
      dispatch(removeFromFavorites(itemId));
    } else {
      dispatch(addToFavorites(itemId));
    }
  };

  const renderTransportItem = ({ item }: { item: TransportItem }) => (
    <TouchableOpacity 
      style={[styles.card, theme === "dark" && styles.cardDark]}
      onPress={() => handleItemPress(item)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.transportInfo}>
          <Text style={[styles.transportType, theme === "dark" && styles.textDark]}>
            {item.type.toUpperCase()}
          </Text>
          <Text style={[styles.transportNumber, theme === "dark" && styles.textDark]}>
            {item.number}
          </Text>
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
          <Text style={[styles.favoriteIcon, favorites.includes(item.id) && styles.favoriteActive]}>
            {favorites.includes(item.id) ? "♥" : "♡"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardContent}>
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.image} />
        )}
        <View style={styles.details}>
          <Text style={[styles.destination, theme === "dark" && styles.textDark]}>
            To: {item.destination}
          </Text>
          <Text style={[styles.departure, theme === "dark" && styles.textDark]}>
            Departs: {item.departureTime}
          </Text>
          <View style={[styles.status, getStatusStyle(item.status)]}>
            <Text style={styles.statusText}>{item.status}</Text>
            {item.delay > 0 && (
              <Text style={styles.delayText}>(+{item.delay}min)</Text>
            )}
          </View>
          {item.platform && (
            <Text style={[styles.platform, theme === "dark" && styles.textDark]}>
              Platform: {item.platform}
            </Text>
          )}
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

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTransportData();
    setRefreshing(false);
  };

  if (loading && items.length === 0) {
    return (
      <View style={[styles.container, styles.center, theme === "dark" && styles.containerDark]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={[styles.loadingText, theme === "dark" && styles.textDark]}>
          Loading transport schedules...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, theme === "dark" && styles.containerDark]}>
      <SearchHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filters}
        onFiltersChange={setFilters}
      />

      <View style={styles.content}>
        <Text style={[styles.title, theme === "dark" && styles.textDark]}>
          Transport Schedules
          {filteredItems.length !== items.length && (
            <Text style={styles.filteredCount}> ({filteredItems.length} of {items.length})</Text>
          )}
        </Text>

        {filteredItems.length === 0 ? (
          <View style={[styles.emptyState, theme === "dark" && styles.containerDark]}>
            <Text style={[styles.emptyTitle, theme === "dark" && styles.textDark]}>
              No routes found
            </Text>
            <Text style={[styles.emptyText, theme === "dark" && styles.textDark]}>
              Try adjusting your search or filters
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredItems}
            renderItem={renderTransportItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        )}
      </View>
    </View>
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
  content: {
    flex: 1,
    padding: 16,
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
  filteredCount: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "normal",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
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
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  transportInfo: {
    flexDirection: "row",
    alignItems: "center",
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
  favoriteIcon: {
    fontSize: 20,
    color: "#ccc",
  },
  favoriteActive: {
    color: "#FF3B30",
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
  destination: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  departure: {
    fontSize: 14,
    marginBottom: 6,
    color: "#666",
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginBottom: 6,
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
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 4,
  },
  delayText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  platform: {
    fontSize: 12,
    color: "#666",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
  textDark: {
    color: "#fff",
  },
});

export default HomeScreen;
