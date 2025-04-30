import { Link } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { getUnits } from "../../backend/api";
import useFetchUnits from "../../hooks/useFetchUnits";
import useFetchKeys from "../../hooks/useFetchKeys";
import useFetchApartment from "../../hooks/useFetchApartment";
function HomeScreen() {
  const { units, loading, error } = useFetchUnits();
  const { keys } = useFetchUnits();
  const { apartments } = useFetchApartment();

  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // console.log("Units", units);

  // const fetchUnits = async () => {
  //   try {
  //     const unitLis = await getUnits();
  //     if (!Array.isArray(unitLis)) {
  //       throw new Error("ERror");
  //     }
  //     if (unitLis.length === 0) {
  //       console.log("Inga enheter finns att visa");
  //     }
  //     setUnits(unitLis);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error, vid hämtning av enheter");
  //     setLoading(false);
  //     setError(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchUnits();
  // }, []);
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
          {/* Enheter Section */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Enheter</Text>
            <Text style={styles.cardCount}>{units.length}</Text>
            {/* Antal enheter */}
            <Link href="/units" style={styles.cardLink}>
              Visa alla enheter
            </Link>
          </View>

          {/* Specialist Enheter Section */}
          {/* <View style={styles.card}>
            <Text style={styles.cardTitle}>Specialist Enheter</Text>
            <Text style={styles.cardCount}>{units.specialister?.length}</Text>
            <Link href="/specialists" style={styles.cardLink}>
              Visa alla specialistenheter
            </Link>
          </View> */}

          {/* Lägenheter Section */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Lägenheter</Text>
            <Text style={styles.cardCount}></Text>
            <Link href="/apartments" style={styles.cardLink}>
              Visa alla lägenheter
            </Link>
          </View>

          {/* Uppgifter Section */}
          {/* <View style={styles.card}>
            <Text style={styles.cardTitle}>Uppgifter</Text>
            <Text style={styles.cardCount}>{units.tasks?.length}</Text>{" "}
            <Link href="/tasks" style={styles.cardLink}>
              Visa alla uppgifter
            </Link>
          </View> */}

          {/* Nycklar Section * */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Nycklar</Text>
            <Text style={styles.cardCount}></Text>
            <Link href="/keys" style={styles.cardLink}>
              Visa alla nycklar
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1, // Tar upp hela skärmen
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
    width: "90%", // Större kort
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    height: 150, // Justerar höjden på korten för att göra dem större
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  cardCount: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#007BFF",
    marginBottom: 15,
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
