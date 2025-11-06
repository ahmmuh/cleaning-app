// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import { FontAwesome } from "@expo/vector-icons";
// import { getUnitByID } from "../../../../../backend/api";
// import { useLocalSearchParams, useRouter } from "expo-router";

// export default function ApartmentScreen() {
//   const router = useRouter();
//   const { unitId } = useLocalSearchParams();
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchApartments = async () => {
//       if (!unitId) return;
//       setLoading(true);
//       try {
//         const unitData = await getUnitByID(unitId);
//         console.log("Unit data:", unitData);
//         if (unitData && Array.isArray(unitData.apartments)) {
//           setData(unitData.apartments);
//         } else {
//           setData([]);
//         }
//       } catch (err) {
//         console.error("Kunde inte hämta unit:", err);
//         setData([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApartments();
//   }, [unitId]);

//   console.log("Data", data);

//   const editHandler = (apartmentId) => {
//     router.push(`/units/${unitId}/apartments/${apartmentId}`);
//   };

//   const detailHandler = (apartmentId) => {
//     router.push(`/units/${unitId}/apartments/${apartmentId}`);
//   };

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#84c276" />
//         <Text>Laddar flyttstäd...</Text>
//       </View>
//     );
//   }

//   if (data.length === 0) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.centered}>
//           <Text style={styles.noDataText}>Inga flyttstäd hittades.</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <FlatList
//         data={data}
//         keyExtractor={(item) => item._id}
//         contentContainerStyle={{ padding: 16 }}
//         renderItem={({ item }) => (
//           <TouchableOpacity onPress={() => detailHandler(item._id)}>
//             <View style={styles.card}>
//               <View style={styles.headerRow}>
//                 <Text style={styles.title}>{item.apartmentLocation}</Text>
//                 <TouchableOpacity onPress={() => editHandler(item._id)}>
//                   <FontAwesome name="pencil" size={20} color="#1e40af" />
//                 </TouchableOpacity>
//               </View>

//               <View style={styles.infoBlock}>
//                 <Text style={styles.bold}>
//                   Beskrivning: {item.description || "-"}
//                 </Text>
//                 <Text style={styles.bold}>
//                   Nyckelplats: {item.keyLocation || "-"}
//                 </Text>
//                 <Text style={styles.bold}>Status: {item.status || "-"}</Text>
//                 <Text style={styles.bold}>
//                   Prioritet: {item.priority || "-"}
//                 </Text>
//                 <Text style={styles.bold}>
//                   Start:{" "}
//                   {item.startDate
//                     ? new Date(item.startDate).toLocaleString("sv-SE")
//                     : "-"}
//                 </Text>
//                 <Text style={styles.bold}>
//                   Slut:{" "}
//                   {item.endDate
//                     ? new Date(item.endDate).toLocaleString("sv-SE")
//                     : "-"}
//                 </Text>
//               </View>
//             </View>
//           </TouchableOpacity>
//         )}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: "#f4f4f5" },
//   centered: { flex: 1, justifyContent: "center", alignItems: "center" },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 18,
//     marginBottom: 16,
//     borderBottomWidth: 2,
//     borderBottomColor: "#ccc",
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   headerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   title: { fontSize: 18, fontWeight: "600", color: "#111" },
//   bold: { fontSize: 15, color: "#333", marginBottom: 4 },
//   infoBlock: { marginTop: 8 },
//   noDataText: { fontSize: 16, color: "#666" },
// });
