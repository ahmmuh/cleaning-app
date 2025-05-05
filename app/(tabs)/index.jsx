import { Link } from "expo-router";
import React, { useEffect } from "react";
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
function HomeScreen() {
  const { units, loading: loadingUnits, error: errorUnits } = useFetchUnits();
  const { keys, loading: loadingKeys, error: errorKeys } = useFetchKeys();
  const {
    apartments,
    loading: loadingApartments,
    error: errorApartments,
  } = useFetchApartment();
  const { tasks, loading: loadingTasks, error: errorTasks } = useFetchTasks();

  const loading =
    loadingUnits || loadingKeys || loadingApartments || loadingTasks;
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
        <Text style={styles.errorText}>Fel vid hämtning av Enheter</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Enheter */}
          <View style={styles.card}>
            <FontAwesome5
              name="building"
              size={30}
              color="#28a745"
              style={styles.cardIcon}
            />
            <Text style={styles.cardTitle}>Enheter</Text>
            <Text style={styles.cardCount}>{units.length}</Text>
            <TouchableOpacity>
              <Link href="/units" style={styles.cardLink}>
                Visa alla enheter
              </Link>
            </TouchableOpacity>
          </View>

          {/* Alla Tasks */}

          <View style={styles.card}>
            <FontAwesome5
              name="tasks"
              size={30}
              color="#28a745"
              style={styles.cardIcon}
            />
            <Text style={styles.cardTitle}>Att göra</Text>
            <Text style={styles.cardCount}>{tasks.length}</Text>
            <TouchableOpacity>
              <Link href="/tasks" style={styles.cardLink}>
                Alla uppgifter
              </Link>
            </TouchableOpacity>
          </View>

          {/* Lägenheter */}
          <View style={styles.card}>
            <FontAwesome5
              name="soap"
              size={30}
              color="#28a745"
              style={styles.cardIcon}
            />
            <Text style={styles.cardTitle}>Lägenhetstäd</Text>
            <Text style={styles.cardCount}>{apartments.length}</Text>
            <TouchableOpacity>
              <Link href="/apartments" style={styles.cardLink}>
                Visa alla lägenheter
              </Link>
            </TouchableOpacity>
          </View>

          {/* Nycklar */}
          <View style={styles.card}>
            <FontAwesome5
              name="key"
              size={30}
              color="#28a745"
              style={styles.cardIcon}
            />
            <Text style={styles.cardTitle}>Nycklar</Text>
            <Text style={styles.cardCount}>{keys.length}</Text>
            <TouchableOpacity>
              <Link href="/keys" style={styles.cardLink}>
                Visa alla nycklar
              </Link>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    marginVertical: 20,
  },
  scrollContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  card: {
    backgroundColor: "#fff",
    padding: 25,
    marginBottom: 20,
    width: "90%",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    height: 170,
    justifyContent: "center",
    alignItems: "center",
  },
  cardIcon: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  cardCount: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#007BFF",
  },
  cardLink: {
    fontSize: 18,
    color: "#007BFF",
    textDecorationLine: "underline",
  },
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
});

export default HomeScreen;
