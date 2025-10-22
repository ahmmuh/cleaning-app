import { useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import useFetchUnits from "../../hooks/useFetchUnits";
import useFetchKeys from "../../hooks/useFetchKeys";
import useFetchApartment from "../../hooks/useFetchApartment";
import useFetchTasks from "../../hooks/useFetchTasks";
import useFetchMachines from "../../hooks/useFetchMachines";

function HomeScreen() {
  const router = useRouter();

  const { units, loading: loadingUnits, error: errorUnits } = useFetchUnits();
  const { keys, loading: loadingKeys, error: errorKeys } = useFetchKeys();
  const {
    machines,
    loading: loadingMachines,
    error: errorMachines,
  } = useFetchMachines();

  const {
    apartments,
    loading: loadingApartments,
    error: errorApartments,
  } = useFetchApartment();
  const { tasks, loading: loadingTasks, error: errorTasks } = useFetchTasks();

  const loading =
    loadingUnits ||
    loadingKeys ||
    loadingApartments ||
    loadingTasks ||
    loadingMachines;
  const error = errorUnits || errorKeys || errorApartments || errorTasks;

  if (loading) {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <Text style={styles.errorText}>Fel vid hämtning av data</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Text style={styles.dashboardTitle}>Översikt</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.grid}>
          {/* Enheter */}
          <TouchableOpacity
            style={[styles.card, { backgroundColor: "#e3f2fd" }]}
            onPress={() => router.push("/units")}>
            <FontAwesome5
              name="building"
              size={26}
              color="#1565c0"
              style={styles.cardIcon}
            />
            <Text style={styles.cardTitle}>Enheter</Text>
            <Text style={styles.cardCount}>{units.length}</Text>
          </TouchableOpacity>

          {/* Tasks */}
          <TouchableOpacity
            style={[styles.card, { backgroundColor: "#f3e5f5" }]}
            onPress={() => router.push("/tasks")}>
            <FontAwesome5
              name="tasks"
              size={26}
              color="#6a1b9a"
              style={styles.cardIcon}
            />
            <Text style={styles.cardTitle}>Att göra</Text>
            <Text style={styles.cardCount}>{tasks.length}</Text>
          </TouchableOpacity>

          {/* Lägenheter */}
          <TouchableOpacity
            style={[styles.card, { backgroundColor: "#e8f5e9" }]}
            onPress={() => router.push("/apartments")}>
            <FontAwesome5
              name="soap"
              size={26}
              color="#2e7d32"
              style={styles.cardIcon}
            />
            <Text style={styles.cardTitle}>Flyttstäd</Text>
            <Text style={styles.cardCount}>{apartments.length}</Text>
          </TouchableOpacity>

          {/* Nycklar */}
          <TouchableOpacity
            style={[styles.card, { backgroundColor: "#fff3e0" }]}
            onPress={() => router.push("/keys")}>
            <FontAwesome5
              name="key"
              size={26}
              color="#ef6c00"
              style={styles.cardIcon}
            />
            <Text style={styles.cardTitle}>Nycklar</Text>
            <Text style={styles.cardCount}>{keys.length}</Text>
          </TouchableOpacity>
          {/* Maskiner */}
          <TouchableOpacity
            style={[styles.card, { backgroundColor: "#fff3e0" }]}
            onPress={() => router.push("/machines")}>
            <FontAwesome5
              name="cog"
              size={26}
              color="#ef6c00"
              style={styles.cardIcon}
            />
            <Text style={styles.cardTitle}>Maskiner</Text>
            <Text style={styles.cardCount}>{machines?.length}</Text>
          </TouchableOpacity>

          {/* Stämpla in/ut */}

          <TouchableOpacity
            style={[styles.card, { backgroundColor: "#ddf3cc" }]}
            onPress={() => router.push("/clocks")}>
            <FontAwesome5
              name="clock"
              size={26}
              color="#ef6c00"
              style={styles.cardIcon}
            />
            <Text style={styles.cardTitle}>Stämpla in/ut</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },
  dashboardTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  scrollContainer: {
    paddingHorizontal: 15,
    paddingBottom: 30,
    alignItems: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  card: {
    width: "48%",
    borderRadius: 12,
    paddingVertical: 20,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  cardIcon: {
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  cardCount: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 6,
    color: "#111",
  },
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default HomeScreen;
