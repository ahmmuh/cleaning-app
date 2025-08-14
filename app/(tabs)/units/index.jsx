import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getUnits } from "../../../backend/api";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { displayError, displaySuccess } from "../../../utils/toastService";

function UnitScreen() {
  const router = useRouter();
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUnits = async () => {
    try {
      const data = await getUnits();
      console.log("UNIT DATA I UnitScreen", data);
      setUnits(data);
      // displaySuccess("Alla enheter är hämtade");
      setLoading(false);
    } catch (error) {
      console.error("Fel vid hämtning av enheter:", error.message);
      setError(error);
      setLoading(false);
      displayError("Fel vid hämtning av enheter");
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  // if (loading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#2a4ede" />
  //     </View>
  //   );
  // }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Fel vid hämtning av enheter: {error.message}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <FlatList
        data={units}
        keyExtractor={(item) => item?._id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => {
          const chef = item?.users?.find((user) => user.role === "Enhetschef");
          const specialister =
            item?.users?.filter((user) => user.role === "Specialare") || [];
          const unitTasks = item?.tasks?.filter((task) => task);

          return (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item?.name}</Text>

              {/* Enhetschef */}
              {chef && (
                <Link
                  href={`/units/${item?._id}/chefer?chefId=${chef?._id}`}
                  style={styles.linkButton}>
                  <View style={styles.linkContent}>
                    <Ionicons
                      name="person-circle-outline"
                      size={20}
                      color="#1e40af"
                    />
                    <View
                      style={{
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems:"center"
                      }}>
                      <Text style={styles.linkText}> {chef.name}</Text>
                      <Text style={{ fontSize: 10 }}>({chef.role})</Text>
                    </View>
                  </View>
                </Link>
              )}

              {/* Specialister */}
              <Pressable
                style={styles.linkButton}
                onPress={() =>
                  router.push({
                    pathname: `/units/${item?._id}/specialister`,
                    query: {
                      unitId: item?._id,
                      users: JSON.stringify(specialister),
                    },
                  })
                }>
                <View style={styles.linkContent}>
                  <Ionicons name="people-outline" size={20} color="#1e40af" />
                  <Text style={styles.linkText}>
                    Specialare ({specialister.length})
                  </Text>
                </View>
              </Pressable>

              {/* Att göra */}
              <Pressable
                style={styles.linkButton}
                onPress={() =>
                  router.push({
                    pathname: `/units/${item?._id}/tasks`,
                    query: { unitId: item._id },
                  })
                }>
                <View style={styles.linkContent}>
                  <Ionicons name="list-outline" size={20} color="#1e40af" />
                  <Text style={styles.linkText}>
                    Att göra ({item?.tasks.length})
                  </Text>
                </View>
              </Pressable>

              {/* Flytstäd */}
              <Pressable
                style={styles.linkButton}
                onPress={() =>
                  router.push({
                    pathname: `/units/${item?._id}/apartments`,
                    query: {
                      unitId: item?._id,
                    },
                  })
                }>
                <View style={styles.linkContent}>
                  <Ionicons name="home-outline" size={20} color="#1e40af" />
                  <Text style={styles.linkText}>
                    Flyttstäd ({item?.apartments?.length})
                  </Text>
                </View>
              </Pressable>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#f9fafe",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
  card: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginBottom: 16,
  },
  linkButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eef2ff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  linkContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  linkText: {
    fontSize: 16,
    color: "#1e40af",
    marginLeft: 8,
  },
});

export default UnitScreen;

// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   Pressable,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import { getUnitByID, getUnits } from "../../../backend/api";
// import { Link, useRouter } from "expo-router";
// import { Ionicons } from "@expo/vector-icons"; // <- Lägger till ikoner
// import { displayError, displaySuccess } from "../../../utils/toastService";

// function UnitScreen() {
//   const router = useRouter();
//   const [units, setUnits] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchUnits = async () => {
//     try {
//       const data = await getUnits();
//       console.log("UNIT DATA I UnitScreen ", data);
//       setUnits(data);
//       displaySuccess("Alla enheter är hämtade");
//       setLoading(false);
//     } catch (error) {
//       console.error("Fel vid hämtning av enheter:", error.message);
//       setError(error);
//       setLoading(false);
//       displayError("Fel vid hämtning av enheter");
//     }
//   };

//   useEffect(() => {
//     fetchUnits();
//   }, []);

//   // const [units, setUnits] = useState([]);
//   // const [loading, setLoading] = useState(true);
//   // const [error, setError] = useState(null);

//   // const fetchUnitById = async (unitId) => {
//   //   try {
//   //     const unitData = await getUnitByID(unitId);
//   //     return unitData;
//   //   } catch (error) {
//   //     console.error("Fel vid hämtning av enhet:", error.message);
//   //     setError(error);
//   //     return null;
//   //   }
//   // };

//   // const fetchUnits = async () => {
//   //   try {
//   //     const data = await getUnits();
//   //     const unitDetailsPromises = data?.map((unitData) =>
//   //       fetchUnitById(unitData._id)
//   //     );
//   //     const unitDetails = await Promise.all(unitDetailsPromises);
//   //     const unitsWithDetails = data?.map((unit, index) => ({
//   //       ...unit,
//   //       ...unitDetails[index],
//   //     }));

//   //     setUnits(unitsWithDetails);
//   //     setLoading(false);
//   //   } catch (error) {
//   //     console.error("Fel vid hämtning av enheter:", error.message);
//   //     setError(error);
//   //     setLoading(false);
//   //   }
//   // };

//   // useEffect(() => {
//   //   fetchUnits();
//   // }, []);

//   //Filter users by Role

//   const chef = units?.users?.find((user) => user.role === "Chef");
//   const specialister = units?.users?.find((user) => user.role === "Specialist");

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#2a4ede" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>
//           Fel vid hämtning av enheter: {error.message}
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.safeAreaContainer}>
//       <FlatList
//         data={units}
//         keyExtractor={(item) => item._id}
//         contentContainerStyle={{ paddingBottom: 20 }}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <Text style={styles.cardTitle}>{item?.name}</Text>
//             {/* Enhetschef */}
//             <Link
//               href={`/units/${item._id}/chefer?chefId=${item?.chef?._id}`}
//               style={styles.linkButton}>
//               <View style={styles.linkContent}>
//                 <Ionicons
//                   name="person-circle-outline"
//                   size={20}
//                   color="#1e40af"
//                 />
//                 <Text style={styles.linkText}>Chef: {item?.chef?.name}</Text>
//               </View>
//             </Link>
//             {/* Specialister */}
//             <Pressable
//               style={styles.linkButton}
//               onPress={() =>
//                 router.push({
//                   pathname: `/units/${item._id}/chefer`,
//                   query: {
//                     unitId: item?._id,
//                     role: "Chef",
//                     specialister: JSON.stringify(item?.users),
//                   },
//                 })
//               }>
//               <View style={styles.linkContent}>
//                 <Ionicons name="people-outline" size={20} color="#1e40af" />
//                 <Text style={styles.linkText}>
//                   Specialstädare ({specialister.length || []})
//                 </Text>
//               </View>
//             </Pressable>
//             {/* Att göra */}
//             <Pressable
//               style={styles.linkButton}
//               onPress={() =>
//                 router.push({
//                   pathname: `/units/${item?._id}/tasks`,
//                   query: {
//                     unitId: item?._id,
//                     tasks: JSON.stringify(item?.tasks),
//                   },
//                 })
//               }>
//               <View style={styles.linkContent}>
//                 <Ionicons name="list-outline" size={20} color="#1e40af" />
//                 <Text style={styles.linkText}>
//                   Att göra ({item?.tasks?.length ?? 0})
//                 </Text>
//               </View>
//             </Pressable>
//             {/* //flytstäd */}
//             <Pressable
//               style={styles.linkButton}
//               onPress={() =>
//                 router.push({
//                   pathname: `/apartments`,
//                   query: {
//                     unitId: item?._id,
//                     apartments: JSON.stringify(item?.apartments),
//                   },
//                 })
//               }>
//               <View style={styles.linkContent}>
//                 <Ionicons name="home-outline" size={20} color="#1e40af" />
//                 <Text style={styles.linkText}>
//                   Flytstäd ({item?.apartments?.length ?? 0})
//                 </Text>
//               </View>
//             </Pressable>
//             {/* {/* Mina objekt */}
//             {/* <Pressable
//               style={styles.linkButton}
//               onPress={() =>
//                 router.push({
//                   pathname: `/units/${item._id}/workplaces`,
//                   query: {
//                     unitId: item?._id,
//                     workPlaces: JSON.stringify(item?.workPlaces),
//                   },
//                 })
//               }>
//               <View style={styles.linkContent}>
//                 <Ionicons name="home-outline" size={20} color="#1e40af" />
//                 <Text style={styles.linkText}>
//                   Mina objekt ({item.workPlaces.length})
//                 </Text>
//               </View>
//             </Pressable> */}
//           </View>
//         )}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeAreaContainer: {
//     flex: 1,
//     backgroundColor: "#f9fafe",
//     paddingHorizontal: 16,
//     paddingTop: 10,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   errorText: {
//     fontSize: 18,
//     color: "red",
//     textAlign: "center",
//   },
//   card: {
//     marginBottom: 20,
//     padding: 16,
//     borderRadius: 12,
//     backgroundColor: "#ffffff",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   cardTitle: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: "#333",
//     marginBottom: 16,
//   },
//   linkButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#eef2ff",
//     padding: 10,
//     marginVertical: 5,
//     borderRadius: 8,
//   },
//   linkContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },
//   linkText: {
//     fontSize: 16,
//     color: "#1e40af",
//     marginLeft: 8,
//   },
// });

// export default UnitScreen;
