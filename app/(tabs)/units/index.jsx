import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { getUnits } from "../../../backend/api";
import { Link } from "expo-router";

function UnitScreen() {
  const [units, setUnits] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUnits = async () => {
    try {
      const data = await getUnits();
      console.log("Units i unit sida", units);
      setUnits(data);
    } catch (error) {
      console.error("Error vid hämtning av units", error.message);
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
    <View style={{ flex: 1 }}>
      <Text>Fel vid hämtning av enheter: {error}</Text>
    </View>;
  }
  return (
    <View style={styles.container}>
      <Text>Sektion för alla enheter</Text>
      {units && units.length > 0 ? (
        units.map((unit) => (
          <Link key={unit.id} href={`/units/${unit.id}`}>
            {unit.name}
          </Link>
        ))
      ) : (
        <Text>Inga enheter tillgängliga</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UnitScreen;
