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
// import { getUnits } from "../../../backend/api";
// import { Link, useRouter } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { displayError, displaySuccess } from "../../../utils/toastService";

// function UnitScreen() {
//   const router = useRouter();
//   const [units, setUnits] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchUnits = async () => {
//     try {
//       const data = await getUnits();
//       console.log("UNIT DATA I UnitScreen", data);
//       setUnits(data);
//       // displaySuccess("Alla enheter är hämtade");
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

//   if (loading) {
//     return (
//       <SafeAreaView
//         style={{
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//           padding: 20,
//         }}>
//         <ActivityIndicator size="large" color="#007BFF" />
//       </SafeAreaView>
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
//         keyExtractor={(item, index) => item?._id ?? index.toString()}
//         contentContainerStyle={{ paddingBottom: 20 }}
//         renderItem={({ item }) => {
//           const chef = item?.users?.find((user) =>
//             user.role.includes("Enhetschef")
//           );
//           const specialister =
//             item?.users?.filter((user) => user.role.includes("Specialare")) ||
//             [];
//           const unitTasks = item?.tasks?.filter((task) => task);

//           return (
//             <View style={styles.card}>
//               <Text style={styles.cardTitle}>{item?.name}</Text>

//               {/* Enhetschef */}
//               {chef && (
//                 <Link
//                   // href={`/units/${item?._id}/chefer?chefId=${chef?._id}`}
//                   href={`/units/${item?._id}/chefer?unitId=${item?._id}&chefId=${chef?._id}`}
//                   style={styles.linkButton}>
//                   <View style={styles.linkContent}>
//                     <Ionicons
//                       name="person-circle-outline"
//                       size={20}
//                       color="#1e40af"
//                     />
//                     <View
//                       style={{
//                         flexDirection: "column",
//                         justifyContent: "center",
//                         alignItems: "center",
//                       }}>
//                       <Text style={styles.linkText}> {chef.name}</Text>
//                       <Text style={{ fontSize: 10 }}>({chef.role})</Text>
//                     </View>
//                   </View>
//                 </Link>
//               )}

//               {/* Specialister */}
//               <Pressable
//                 style={styles.linkButton}
//                 onPress={() =>
//                   router.push({
//                     pathname: `/units/${item?._id}/specialister`,
//                     query: {
//                       unitId: item?._id,
//                       users: JSON.stringify(specialister),
//                     },
//                   })
//                 }>
//                 <View style={styles.linkContent}>
//                   <Ionicons name="people-outline" size={20} color="#1e40af" />
//                   <Text style={styles.linkText}>
//                     Specialare ({specialister.length})
//                   </Text>
//                 </View>
//               </Pressable>

//               {/* Att göra */}
//               <Pressable
//                 style={styles.linkButton}
//                 onPress={() =>
//                   router.push({
//                     pathname: `/units/${item?._id}/tasks`,
//                     query: { unitId: item._id },
//                   })
//                 }>
//                 <View style={styles.linkContent}>
//                   <Ionicons name="list-outline" size={20} color="#1e40af" />
//                   <Text style={styles.linkText}>
//                     Att göra ({unitTasks.length})
//                   </Text>
//                 </View>
//               </Pressable>

//               {/* Flytstäd */}
//               <Pressable
//                 style={styles.linkButton}
//                 onPress={() =>
//                   router.push({
//                     pathname: `/units/${item._id}/apartments`,
//                     query: { unitId: item._id },
//                   })
//                 }>
//                 <View style={styles.linkContent}>
//                   <Ionicons name="home-outline" size={20} color="#1e40af" />
//                   <Text style={styles.linkText}>
//                     Flyttstäd ({item?.apartments?.length})
//                   </Text>
//                 </View>
//               </Pressable>
//             </View>
//           );
//         }}
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

import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { getUnits } from "../../../backend/api";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { displayError } from "../../../utils/toastService";

function UnitScreen() {
  const router = useRouter();
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUnits = async () => {
    try {
      const data = await getUnits();
      setUnits(data);
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

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#007BFF" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Fel vid hämtning av enheter: {error.message}
        </Text>
      </View>
    );
  }

  // Filtrera units baserat på sökterm (enhetens namn eller chefens namn)
  const filteredUnits = units.filter((unit) => {
    const term = searchTerm.toLowerCase();
    const unitName = unit.name?.toLowerCase() || "";
    const chefName =
      unit.users
        ?.find((u) => u.role.includes("Enhetschef"))
        ?.name?.toLowerCase() || "";
    return unitName.includes(term) || chefName.includes(term);
  });

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {/* Sökfält */}
      <TextInput
        style={styles.searchInput}
        placeholder="Sök enhet eller chef..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {filteredUnits.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.noUnitsText}>
            {units.length === 0
              ? "Det finns inga enheter att visa just nu."
              : "Ingen enhet matchar söktermen."}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredUnits}
          keyExtractor={(item, index) => item?._id ?? index.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => {
            const chef = item?.users?.find((user) =>
              user.role.includes("Enhetschef")
            );
            const specialister =
              item?.users?.filter((user) => user.role.includes("Specialare")) ||
              [];
            const unitTasks = item?.tasks?.filter((task) => task);

            return (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item?.name}</Text>

                {/* Enhetschef */}
                {chef && (
                  <Link
                    href={`/units/${item?._id}/chefer?unitId=${item?._id}&chefId=${chef?._id}`}
                    style={styles.linkButton}>
                    <View style={styles.linkContent}>
                      <Ionicons
                        name="person-circle-outline"
                        size={20}
                        color="#1e40af"
                      />
                      <View>
                        <Text style={styles.linkText}>{chef.name}</Text>
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
                      Att göra ({unitTasks.length})
                    </Text>
                  </View>
                </Pressable>

                {/* Flytstäd */}
                <Pressable
                  style={styles.linkButton}
                  onPress={() =>
                    router.push({
                      pathname: `/units/${item._id}/apartments`,
                      query: { unitId: item._id },
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
      )}
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
  searchInput: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: "#CCC",
    borderWidth: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  noUnitsText: {
    color: "#475569",
    fontSize: 16,
    textAlign: "center",
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
