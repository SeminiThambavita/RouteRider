import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Modal } from "react-native";
import { useTheme } from "../../styles/ThemeContext";

interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: {
    transportType: string;
    status: string;
  };
  onFiltersChange: (filters: any) => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
}) => {
  const { theme } = useTheme();
  const [showFilters, setShowFilters] = useState(false);

  const transportTypes = ["all", "bus", "train", "tram"];
  const statusTypes = ["all", "On Time", "Delayed", "Cancelled"];

  const clearFilters = () => {
    onFiltersChange({ transportType: "all", status: "all" });
    onSearchChange("");
  };

  const activeFiltersCount = [
    filters.transportType !== "all",
    filters.status !== "all",
    searchQuery.length > 0
  ].filter(Boolean).length;

  return (
    <View style={[styles.container, theme === "dark" && styles.containerDark]}>
      {/* Search Bar */}
      <View style={[styles.searchBar, theme === "dark" && styles.searchBarDark]}>
        <TextInput
          style={[styles.searchInput, theme === "dark" && styles.textDark]}
          placeholder="Search routes, destinations..."
          placeholderTextColor={theme === "dark" ? "#888" : "#999"}
          value={searchQuery}
          onChangeText={onSearchChange}
        />
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Text style={styles.filterIcon}>🔍</Text>
          {activeFiltersCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFiltersCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Filters Modal */}
      <Modal
        visible={showFilters}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilters(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, theme === "dark" && styles.modalContentDark]}>
            <Text style={[styles.modalTitle, theme === "dark" && styles.textDark]}>
              Filter Routes
            </Text>

            {/* Transport Type Filter */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterLabel, theme === "dark" && styles.textDark]}>
                Transport Type
              </Text>
              <View style={styles.filterOptions}>
                {transportTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.filterOption,
                      filters.transportType === type && styles.filterOptionActive,
                    ]}
                    onPress={() => onFiltersChange({ ...filters, transportType: type })}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        filters.transportType === type && styles.filterOptionTextActive,
                      ]}
                    >
                      {type === "all" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Status Filter */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterLabel, theme === "dark" && styles.textDark]}>
                Status
              </Text>
              <View style={styles.filterOptions}>
                {statusTypes.map((status) => (
                  <TouchableOpacity
                    key={status}
                    style={[
                      styles.filterOption,
                      filters.status === status && styles.filterOptionActive,
                    ]}
                    onPress={() => onFiltersChange({ ...filters, status: status })}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        filters.status === status && styles.filterOptionTextActive,
                      ]}
                    >
                      {status === "all" ? "All" : status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.clearButton]}
                onPress={clearFilters}
              >
                <Text style={styles.clearButtonText}>Clear All</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionButton, styles.applyButton]}
                onPress={() => setShowFilters(false)}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  containerDark: {
    backgroundColor: "#1a1a1a",
    borderBottomColor: "#333",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchBarDark: {
    backgroundColor: "#2d2d2d",
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  textDark: {
    color: "#fff",
  },
  filterButton: {
    padding: 8,
    position: "relative",
  },
  filterIcon: {
    fontSize: 20,
  },
  filterBadge: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "#FF3B30",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  filterBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: 400,
  },
  modalContentDark: {
    backgroundColor: "#2d2d2d",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  filterSection: {
    marginBottom: 24,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  filterOptionActive: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  filterOptionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  filterOptionTextActive: {
    color: "white",
  },
  modalActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: "auto",
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  clearButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  applyButton: {
    backgroundColor: "#007AFF",
  },
  clearButtonText: {
    color: "#666",
    fontWeight: "600",
  },
  applyButtonText: {
    color: "white",
    fontWeight: "600",
  },
});

export default SearchHeader;
