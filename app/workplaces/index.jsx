import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  ScrollView,
} from "react-native";
import useFetchWorkplaces from "../../hooks/useFetchWorkplaces";

export default function WorkplacesIndexScreen() {
  const { workplaces, loading, error } = useFetchWorkplaces();
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#34D399" />
        <Text style={styles.loadingText}>Laddar arbetsplatser...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Kunde inte hämta arbetsplatser</Text>
      </View>
    );
  }

  // Filtrera arbetsplatser via enhetens namn
  const filteredWorkplaces = workplaces.filter((wp) =>
    wp.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderCleaner = (cleaner) => (
    <View key={cleaner._id} style={styles.cleanerCard}>
      <Text style={styles.cleanerName} numberOfLines={2}>
        {cleaner.name}
      </Text>
      <Text style={styles.cleanerRole} numberOfLines={1}>
        {cleaner.role?.join(", ") || "–"}
      </Text>
      <Text style={styles.cleanerEmail} numberOfLines={1}>
        E-post: {cleaner.email || "Ingen e-post"}
      </Text>
      <Text style={styles.cleanerPhone} numberOfLines={1}>
        Telefon: {cleaner.phone || "–"}
      </Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.address}>{item.address}</Text>

      {Array.isArray(item.cleaners) && item.cleaners.length > 0 && (
        <>
          <Text style={styles.cleanersLabel}>Här jobbar</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 10 }}>
            {item.cleaners.map(renderCleaner)}
          </ScrollView>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Sökfält */}
      <TextInput
        style={styles.searchInput}
        placeholder="Sök arbetsplats..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {filteredWorkplaces.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.noWorkplacesText}>
            {workplaces.length === 0
              ? "Det finns inga arbetsplatser att visa just nu."
              : "Ingen arbetsplats matchar söktermen."}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredWorkplaces}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0FDF4",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  searchInput: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 10,
    borderColor: "#CCC",
    borderWidth: 1,
    marginBottom: 15,
    fontSize: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#064E3B",
  },
  address: {
    fontSize: 16,
    color: "#065F46",
    marginTop: 4,
  },
  cleanersLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#033225ff",
    marginTop: 10,
  },
  cleanerCard: {
    backgroundColor: "#dadde5ff",
    padding: 13,
    borderRadius: 10,
    marginRight: 12,
    minWidth: 200,
  },
  cleanerName: {
    fontWeight: "700",
    color: "#064E3B",
    fontSize: 14,
  },
  cleanerRole: {
    fontSize: 14,
    color: "#064E3B",
  },
  cleanerEmail: {
    fontSize: 14,
    color: "#064E3B",
  },
  cleanerPhone: {
    fontSize: 14,
    color: "#064E3B",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#065F46",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    fontWeight: "600",
  },
  noWorkplacesText: {
    color: "#065F46",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
