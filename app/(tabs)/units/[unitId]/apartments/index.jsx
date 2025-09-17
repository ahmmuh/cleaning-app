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
import useFetchCurrentUser from "../../../../../hooks/useFetchCurrentUser";
import useFetchUsers from "../../../../../hooks/useFetchUsers";

function ApartmentScreen() {
  const { unitId } = useLocalSearchParams();
  const router = useRouter();

  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { users } = useFetchUsers();

  const { user } = useFetchCurrentUser();

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
            <Text style={styles.noDataText}>Inga flyttstäd hittades.</Text>
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
  container: {
    backgroundColor: "#f4f4f5",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#222",
    marginBottom: 14,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    marginBottom: 16, // space mellan kort
    borderBottomWidth: 2, // tydlig border mellan kort
    borderBottomColor: "#ccc",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#111",
  },
  status: {
    fontSize: 15,
    fontWeight: "500",
    marginTop: 2,
  },
  description: {
    fontSize: 15,
    color: "#444",
    paddingVertical: 6,
    borderBottomWidth: 1, // tunn border mellan beskrivning och nästa rad
    borderBottomColor: "#e5e7eb",
    lineHeight: 22,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    borderBottomWidth: 1, // tunn border mellan rader
    borderBottomColor: "#e5e7eb",
    marginBottom: 6,
  },
  detailText: {
    fontSize: 15,
    color: "#666",
    marginLeft: 8,
  },
  updateButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 16,
    alignItems: "center",
  },
  buttonTitle: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

export default ApartmentScreen;
