// import { useLocalSearchParams } from "expo-router";
// import { useEffect, useState } from "react";
// import {
//   SafeAreaView,
//   Text,
//   View,
//   StyleSheet,
//   FlatList,
//   ActivityIndicator,
// } from "react-native";
// import { getWorkplaces } from "../../../../../backend/workPlaceAPI";
// import Feather from "react-native-vector-icons/Feather"; // ⬅️ Import för ikon

// function WorkPlaceScreen() {
//   const [workplaces, setWorkplaces] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const { unitId } = useLocalSearchParams();

//   const fetchWorkplaces = async () => {
//     try {
//       const workplaceList = await getWorkplaces(unitId);
//       if (!workplaceList.workPlaces || workplaceList.workPlaces.length === 0) {
//         console.log("Inga arbetsplatser hittades");
//       }
//       setWorkplaces(workplaceList.workPlaces);
//       setLoading(false);
//     } catch (error) {
//       console.error("Fel vid hämtning av arbetsplatser", error.message);
//       setError(error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchWorkplaces();
//   }, []);

//   if (error) {
//     return (
//       <View style={styles.centered}>
//         <Text style={styles.errorText}>Något gick fel</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         {loading ? (
//           <ActivityIndicator size="large" color="blue" />
//         ) : (
//           <FlatList
//             data={workplaces}
//             keyExtractor={(item) => item._id}
//             contentContainerStyle={{ paddingBottom: 20 }}
//             renderItem={({ item }) => (
//               <View style={styles.cardWrapper}>
//                 <View style={styles.card}>
//                   <Text style={styles.cardTitle}>{item.name}</Text>
//                   <View style={styles.locationContainer}>
//                     <Feather
//                       name="map-pin"
//                       size={18}
//                       color="#666"
//                       style={{ marginRight: 6 }}
//                     />
//                     <Text style={styles.locationText}>{item.location}</Text>
//                   </View>
//                 </View>
//               </View>
//             )}
//             ListEmptyComponent={
//               <Text
//                 style={{ textAlign: "center", marginTop: 20, fontSize: 20 }}>
//                 Inga arbetsplatser hittades
//               </Text>
//             }
//           />
//         )}
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingTop: 10,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   errorText: {
//     color: "red",
//     fontSize: 20,
//   },
//   cardWrapper: {
//     marginVertical: 8,
//   },
//   card: {
//     backgroundColor: "#fff", // ⬅️ Ljusare och renare bakgrund
//     borderRadius: 12,
//     padding: 16, // ⬅️ Bra spacing inuti
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 3 },
//     elevation: 3,
//   },
//   cardTitle: {
//     fontSize: 20,
//     fontWeight: "600",
//     marginBottom: 8,
//     color: "#111",
//     textAlign: "center",
//   },
//   locationContainer: {
//     flexDirection: "row", // ⬅️ Ikon och plats på samma rad
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   locationText: {
//     fontSize: 16,
//     color: "#666",
//   },
// });

// export default WorkPlaceScreen;

//NY kod:
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  ScrollView,
} from "react-native";
import useFetchWorkplaces from "../../hooks/useFetchWorkplaces";

export default function WorkplacesIndexScreen() {
  const { workplaces, loading, error } = useFetchWorkplaces();
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#34D399" />
        <Text style={styles.loadingText}>Laddar arbetsplatser...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Kunde inte hämta arbetsplatser</Text>
      </View>
    );
  }

  // Filtrera arbetsplatser via enhetens namn
  const filteredWorkplaces = workplaces.filter((wp) =>
    wp.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderCleaner = (cleaner) => (
    <View key={cleaner._id} style={styles.cleanerCard}>
      <Text style={styles.cleanerName} numberOfLines={1}>
        {cleaner.name}
      </Text>
      <Text style={styles.cleanerRole} numberOfLines={1}>
        {cleaner.role?.join(", ") || "–"}
      </Text>
      <Text style={styles.cleanerEmail} numberOfLines={1}>
        E-postadress: {cleaner.email || "Ingen e-post"}
      </Text>
      <Text style={styles.cleanerPhone} numberOfLines={1}>
        Telefon: {cleaner.phone || "–"}
      </Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.address}>{item.address}</Text>

      <View style={styles.cleanersContainer}>
        {item.cleaners && item.cleaners.length > 0 && (
          <Text style={styles.cleanersLabel}>Här jobbar</Text>
        )}
        {/* <Text style={styles.cleanersCount}>
          {Array.isArray(item.cleaners) ? item.cleaners.length : 0}
        </Text> */}
      </View>

      {Array.isArray(item.cleaners) && item.cleaners.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10 }}>
          {item.cleaners.map(renderCleaner)}
        </ScrollView>
      ) : null}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Arbetsplatser</Text> */}

      {/* Sökfält */}
      <TextInput
        style={styles.searchInput}
        placeholder="Sök arbetsplats..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {filteredWorkplaces.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.noWorkplacesText}>
            {workplaces.length === 0
              ? "Det finns inga arbetsplatser att visa just nu."
              : "Ingen arbetsplats matchar söktermen."}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredWorkplaces}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0FDF4",
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#065F46",
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    borderColor: "#CCC",
    borderWidth: 1,
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#064E3B",
  },
  address: {
    fontSize: 14,
    color: "#065F46",
    marginTop: 4,
  },
  cleanersContainer: {
    flexDirection: "row",
    marginTop: 6,
    alignItems: "center",
  },
  cleanersLabel: {
    fontSize: 17,
    color: "#033225ff",
    marginRight: 6,
  },
  cleanersCount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#047857",
  },
  cleanerCard: {
    backgroundColor: "#F3F4F6",
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
    width: 150,
  },
  cleanerName: {
    fontWeight: "600",
    color: "#064E3B",
    fontSize: 12,
  },
  cleanerRole: {
    fontSize: 10,
    color: "#064E3B",
  },
  cleanerEmail: {
    fontSize: 10,
    color: "#064E3B",
  },
  cleanerPhone: {
    fontSize: 10,
    color: "#064E3B",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#065F46",
  },
  errorText: {
    color: "red",
  },
  noWorkplacesText: {
    color: "#065F46",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
