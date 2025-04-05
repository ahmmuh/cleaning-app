import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getUnitByID, getUnits } from "../../../backend/api";
import { Link } from "expo-router";
import ListItem from "../../../components/listItem";
import Card from "../../../components/card";
import MainLink from "../../../components/link";

function UnitScreen() {
  const [units, setUnits] = useState([]);

  const [unit, setUnit] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUnitById = async (unitId) => {
    try {
      const unitData = await getUnitByID(unitId);
      console.log("Fullständig enhet:", unitData);
      // setUnit(unitData);
      return unitData;
    } catch (error) {
      console.error("Error vid hämtning av 1 unit", error.message);
      setError(error);
      // setLoading(false);
      return null;
    }
  };

  const fetchUnits = async () => {
    try {
      const data = await getUnits();
      console.log("Units i unit sida", data);
      console.log("Type of units data *********", typeof data);

      // Hämta detaljer för varje enhet genom att loopa genom dem
      const unitDetailsPromses = data.map((unitData) =>
        getUnitByID(unitData._id)
      );

      // Vänta på att alla detaljer ska hämtas
      const unitDetails = await Promise.all(unitDetailsPromses);
      setUnits(data);

      //kombinera alla enheter med detaljer

      const unitsWithDetails = data.map((unit, index) => ({
        ...unit,
        ...unitDetails[index],
      }));

      setUnits(unitsWithDetails);
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
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 20, color: "red", alignSelf: "center" }}>
          Fel vid hämtning av enheter: {error.message}
        </Text>
      </View>
    );
  }

  const Item = ({ title }) => {
    return (
      <View>
        <Text>{title}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {/* <Text style={{ paddingLeft: 20, fontSize: 20 }}>
          Sektion för alla enheter
        </Text> */}
      <FlatList
        data={units}
        renderItem={({ item }) => (
          <>
            <Card title={item.name} key={item._id}>
              <Link href={`/units/${item._id}/chef`} style={styles.link}>
                <Text>Enhetchef {item.chef.name}</Text>
              </Link>

              <Link href={`/units/${item._id}/specialist`} style={styles.link}>
                <Text>Specialister ({item.specialister.length})</Text>
              </Link>
              <Link href={`/units/${item._id}/task`} style={styles.link}>
                <Text>Att göra ({item.tasks.length})</Text>
              </Link>
              <Link href={`/units/${item._id}/workplace`} style={styles.link}>
                <Text>Mina objekt ({item.workPlaces.length})</Text>
              </Link>
            </Card>
          </>
        )}
        // keyExtractor={({ item }) => item.id}
        ListHeaderComponent={(item) => <Text>{item.name}</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20, // Ger extra padding runt scrollinnehållet
  },
  safeAreaContainer: {
    flex: 1, // Gör så att SafeAreaView tar upp hela skärmen
    marginVertical: 10,
  },
  link: {
    marginBottom: 2,
    fontSize: 15,
    color: "blue",
    padding: 5,
    border: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 20,
    cursor: "pointer",
  },
});

export default UnitScreen;
