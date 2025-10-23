// import React from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   ActivityIndicator,
// } from "react-native";
// import useFetchUsers from "../../hooks/useFetchUsers";

// export default function UsersIndexScreen() {
//   const { users, loading, error } = useFetchUsers();

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#007AFF" />
//         <Text style={styles.loadingText}>Laddar användare...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.center}>
//         <Text style={styles.errorText}>Kunde inte hämta användare</Text>
//       </View>
//     );
//   }

//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <View style={styles.rowBetween}>
//         <Text style={styles.name}>{item.name || "Namn saknas"}</Text>
//       </View>

//       {/* Roller (kan vara flera) */}
//       {Array.isArray(item.role) && item.role.length > 0 ? (
//         <View style={styles.rolesContainer}>
//           {item.role.map((r, index) => (
//             <Text key={index} style={styles.roleText}>
//               {r}
//             </Text>
//           ))}
//         </View>
//       ) : (
//         <Text style={styles.roleText}>–</Text>
//       )}

//       {/* E-post och telefon */}
//       <Text style={styles.email}>{item.email || "Ingen e-post"}</Text>
//       <Text style={styles.phone}>{item.phone || "–"}</Text>

//       {/* Arbetsplats */}
//       <View style={styles.placeContainer}>
//         <Text style={styles.placeLabel}>Arbetsplats:</Text>
//         <Text style={styles.placeText}>{item.workplace?.name || "–"}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Användare</Text>
//       <FlatList
//         data={users}
//         keyExtractor={(item) => item._id}
//         renderItem={renderItem}
//         contentContainerStyle={{ paddingBottom: 40 }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F8FAFC",
//     paddingHorizontal: 15,
//     paddingTop: 20,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: "#1E293B",
//     marginBottom: 15,
//   },
//   card: {
//     backgroundColor: "#FFFFFF",
//     padding: 15,
//     borderRadius: 12,
//     marginBottom: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 5,
//     elevation: 2,
//   },
//   rowBetween: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#0F172A",
//   },
//   rolesContainer: {
//     marginTop: 4,
//     flexDirection: "column", // Viktigt: visar roller under varandra
//   },
//   roleText: {
//     fontSize: 14,
//     color: "#475569",
//   },
//   email: {
//     fontSize: 14,
//     color: "#334155",
//     marginTop: 6,
//   },
//   phone: {
//     fontSize: 14,
//     color: "#334155",
//     marginTop: 2,
//   },
//   placeContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 6,
//   },
//   placeLabel: {
//     fontSize: 14,
//     fontWeight: "500",
//     color: "#475569",
//     marginRight: 5,
//   },
//   placeText: {
//     fontSize: 14,
//     color: "#0F172A",
//   },
//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   loadingText: {
//     marginTop: 10,
//     color: "#475569",
//   },
//   errorText: {
//     color: "red",
//   },
// });

import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import useFetchUsers from "../../hooks/useFetchUsers";

export default function UsersIndexScreen() {
  const { users, loading, error } = useFetchUsers();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Laddar användare...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Kunde inte hämta användare</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.name}>{item.name || "Namn saknas"}</Text>
      </View>

      {/* Roller */}
      {Array.isArray(item.role) && item.role.length > 0 ? (
        <View style={styles.rolesContainer}>
          {item.role.map((r, index) => (
            <Text key={index} style={styles.roleText}>
              {r}
            </Text>
          ))}
        </View>
      ) : (
        <Text style={styles.roleText}>–</Text>
      )}

      {/* E-post och telefon */}
      <Text style={styles.email}>{item.email || "Ingen e-post"}</Text>
      <Text style={styles.phone}>{item.phone || "–"}</Text>

      {/* Assigned Workplaces */}
      <View style={styles.placeContainer}>
        <Text style={styles.placeLabel}>Arbetsplatser:</Text>
        <View style={styles.workplacesContainer}>
          {Array.isArray(item.assignedWorkplaces) &&
          item.assignedWorkplaces.length > 0 ? (
            item.assignedWorkplaces.map((wp) => (
              <Text key={wp._id} style={styles.placeText}>
                {wp.name}
              </Text>
            ))
          ) : (
            <Text style={styles.placeText}>–</Text>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Användare</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E293B",
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
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0F172A",
  },
  rolesContainer: {
    marginTop: 4,
    flexDirection: "column",
  },
  roleText: {
    fontSize: 14,
    color: "#475569",
  },
  email: {
    fontSize: 14,
    color: "#334155",
    marginTop: 6,
  },
  phone: {
    fontSize: 14,
    color: "#334155",
    marginTop: 2,
  },
  placeContainer: {
    marginTop: 6,
  },
  placeLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#475569",
    marginBottom: 2,
  },
  workplacesContainer: {
    flexDirection: "column", // Visa flera arbetsplatser under varandra
  },
  placeText: {
    fontSize: 14,
    color: "#0F172A",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#475569",
  },
  errorText: {
    color: "red",
  },
});
