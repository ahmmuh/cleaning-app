import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { getWorkplaces } from "../../../../../backend/workPlaceAPI";
import Feather from "react-native-vector-icons/Feather"; // ⬅️ Import för ikon

function WorkPlaceScreen() {
  const [workplaces, setWorkplaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { unitId } = useLocalSearchParams();

  const fetchWorkplaces = async () => {
    try {
      const workplaceList = await getWorkplaces(unitId);
      if (!workplaceList.workPlaces || workplaceList.workPlaces.length === 0) {
        console.log("Inga arbetsplatser hittades");
      }
      setWorkplaces(workplaceList.workPlaces);
    } catch (error) {
      console.error("Fel vid hämtning av arbetsplatser", error.message);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkplaces();
  }, []);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Något gick fel</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <FlatList
            data={workplaces}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <View style={styles.cardWrapper}>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <View style={styles.locationContainer}>
                    <Feather
                      name="map-pin"
                      size={18}
                      color="#666"
                      style={{ marginRight: 6 }}
                    />
                    <Text style={styles.locationText}>{item.location}</Text>
                  </View>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <Text
                style={{ textAlign: "center", marginTop: 20, fontSize: 20 }}>
                Inga arbetsplatser hittades
              </Text>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 20,
  },
  cardWrapper: {
    marginVertical: 8,
  },
  card: {
    backgroundColor: "#fff", // ⬅️ Ljusare och renare bakgrund
    borderRadius: 12,
    padding: 16, // ⬅️ Bra spacing inuti
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: "#111",
    textAlign: "center",
  },
  locationContainer: {
    flexDirection: "row", // ⬅️ Ikon och plats på samma rad
    alignItems: "center",
    justifyContent: "center",
  },
  locationText: {
    fontSize: 16,
    color: "#666",
  },
});

export default WorkPlaceScreen;
