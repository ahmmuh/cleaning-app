import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getUnitByID, getUnits } from "../../../backend/api";
import { Link, useRouter } from "expo-router";
import ListItem from "../../../components/listItem";
import Card from "../../../components/card";

function UnitScreen() {
  const router = useRouter();
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
              <Link
                href={`/units/${item._id}/chefer?chefId=${item.chef._id}`} // Skickar chefens ID
                style={styles.link}>
                <Text>Enhetchef: {item.chef.name}</Text>
              </Link>

              {/* <Link href={`/units/${item._id}/specialist`} style={styles.link}>
                <Text>Specialister ({item.specialister.length})</Text>
              </Link> */}

              <Pressable
                onPress={() =>
                  router.push({
                    pathname: `/units/${item._id}/specialister`,
                    query: {
                      unitId: item._id,
                      specialister: JSON.stringify(item.specialister),
                    },
                  })
                }>
                <Text style={styles.link}>
                  Specialer ({item.specialister.length})
                </Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  router.push({
                    pathname: `/units/${item._id}/tasks`,
                    query: {
                      unitId: item._id,
                      specialister: JSON.stringify(item.tasks),
                    },
                  })
                }>
                <Text style={styles.link}>Att göra ({item.tasks.length})</Text>
              </Pressable>
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: `/units/${item._id}/workplaces`,
                    query: {
                      unitId: item._id,
                      workPlaces: JSON.stringify(item.workPlaces),
                    },
                  })
                }>
                <Text style={styles.link}>
                  Mina objekt ({item.workPlaces.length})
                </Text>
              </Pressable>
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
  safeAreaContainer: {
    flex: 1, // Gör så att SafeAreaView tar upp hela skärmen
    marginVertical: 10,
  },
  link: {
    marginBottom: 2,
    fontSize: 17,
    color: "#2a4ede",
    padding: 2,
    border: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#334",
    paddingBottom: 20,
    cursor: "pointer",
    textDecoration: "underline",
    fontStyle: "italic",
  },
});

export default UnitScreen;
