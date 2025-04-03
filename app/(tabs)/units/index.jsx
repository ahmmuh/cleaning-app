import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getUnits } from "../../../backend/api";
import { Link } from "expo-router";
import ListItem from "../../../components/listItem";

function UnitScreen() {
  const [units, setUnits] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUnits = async () => {
    try {
      const data = await getUnits();
      console.log("Units i unit sida", data);
      setUnits(data);
      setLoading(false);
    } catch (error) {
      console.error("Error vid hämtning av units", error.message);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1 }}>
        <Text>Fel vid hämtning av enheter: {error.message}</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Text style={{ paddingLeft: 20, fontSize: 20 }}>
        Sektion för alla enheter
      </Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {units && units.length > 0 ? (
            units.map((unit) => (
              <ListItem key={unit._id} url={`/units/${unit._id}`}>
                <Text> {unit.name}</Text>
              </ListItem>
            ))
          ) : (
            <Text>Inga enheter tillgängliga</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },

  scrollContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20, // Ger extra padding runt scrollinnehållet
    alignItems: "center",
    justifyContent: "center",
  },
  safeAreaContainer: {
    flex: 1, // Gör så att SafeAreaView tar upp hela skärmen
    marginVertical: 20,
  },
});

export default UnitScreen;
