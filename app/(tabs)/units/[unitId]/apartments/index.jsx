import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getUnitByID } from "../../../../../backend/api";
import { FontAwesome } from "@expo/vector-icons";

function ApartmentScreen() {
  const { unitId } = useLocalSearchParams();
  const router = useRouter();

  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApartments = async () => {
    try {
      const unitData = await getUnitByID(unitId);

      if (!unitData?.apartments || unitData.apartments.length === 0) {
        setApartments([]);
        return;
      }

      const uniqueApartments = unitData.apartments.filter(
        (apartment, index, self) =>
          index === self.findIndex((a) => a._id === apartment._id)
      );

      setApartments(uniqueApartments);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, [unitId]);

  const editHandler = (apartmentId) => {
    router.push(
      //   `/units/${unitId}/apartments/editApartment?apartmentId=${apartmentId}``/units/${unitId}/apartments/${apartmentId}`
      `/units/${unitId}/apartments/${apartmentId}`
    );
  };

  const detailHandler = (apartmentId) => {
    router.push(`/units/${unitId}/apartments/${apartmentId}`);
  };

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("sv-SE") : "-";

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#84c276" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error.message}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {apartments.length === 0 ? (
          <View style={styles.centered}>
            <Text style={styles.noDataText}>Inga lägenheter hittades.</Text>
          </View>
        ) : (
          <FlatList
            data={apartments}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => detailHandler(item._id)}>
                <View style={styles.card}>
                  <View style={styles.headerRow}>
                    <Text style={styles.title}>{item.apartmentLocation}</Text>
                    <TouchableOpacity onPress={() => editHandler(item._id)}>
                      <FontAwesome name="pencil" size={20} color="#1e40af" />
                    </TouchableOpacity>
                  </View>

                  <View>
                    <Text style={styles.bold}>
                      Beskrivning: {item.description || "-"}
                    </Text>
                    <Text style={styles.bold}>
                      Nyckelplats: {item.keyLocation || "-"}
                    </Text>
                    <Text style={styles.bold}>
                      Status: {item.status || "-"}
                    </Text>
                    <Text style={styles.bold}>
                      Prioritet: {item.priority || "-"}
                    </Text>
                    <Text style={styles.bold}>
                      Start: {new Date(item.startDate).toLocaleString("sv-SE")}
                    </Text>
                    <Text style={styles.bold}>
                      Slut: {new Date(item.endDate).toLocaleString("sv-SE")}
                    </Text>
                    <Text style={styles.bold}>
                      Tilldelad:{" "}
                      {new Date(item.assignedAt).toLocaleString("sv-SE")}
                    </Text>
                    {item.status === "Ej påbörjat" && (
                      <Text style={styles.bold}>
                        Skapad:{" "}
                        {new Date(item.createdAt).toLocaleString("sv-SE")}
                      </Text>
                    )}

                    {item.status === "Påbörjat" && (
                      <Text
                        style={[
                          styles.bold,
                          {
                            color: "orange",
                          },
                        ]}>
                        Senast ändrad:{" "}
                        {new Date(item.updatedAt).toLocaleString("sv-SE")}
                      </Text>
                    )}
                    {item.status === "Färdigt" && (
                      <Text
                        style={[
                          styles.bold,
                          {
                            color: "green",
                          },
                        ]}>
                        Senast ändrad:{" "}
                        {new Date(item.updatedAt).toLocaleString("sv-SE")}
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, marginTop: 10 },
  container: { flex: 1, paddingHorizontal: 15 },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: { color: "red", fontSize: 16 },
  noDataText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    paddingHorizontal: 30,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  bold: { fontWeight: "bold" },
});

export default ApartmentScreen;
