// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   ActivityIndicator,
//   TextInput,
// } from "react-native";
// import useFetchUsers from "../../hooks/useFetchUsers";

// export default function UsersIndexScreen() {
//   const { users, loading, error } = useFetchUsers();
//   const [searchTerm, setSearchTerm] = useState("");

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

//   // Filtrera användare baserat på söktermen
//   const filteredUsers = users.filter((user) => {
//     const term = searchTerm.toLowerCase();
//     const name = user.name?.toLowerCase() || "";
//     const email = user.email?.toLowerCase() || "";
//     const roles = Array.isArray(user.role)
//       ? user.role.join(", ").toLowerCase()
//       : "";
//     return name.includes(term) || email.includes(term) || roles.includes(term);
//   });

//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <Text style={styles.name}>{item.name || "Namn saknas"}</Text>

//       {/* Roll */}
//       <View style={styles.infoRow}>
//         <Text style={styles.label}>Roll:</Text>
//         <Text style={styles.value}>
//           {Array.isArray(item.role) && item.role.length > 0
//             ? item.role.join(", ")
//             : "–"}
//         </Text>
//       </View>

//       {/* E-post */}
//       <View style={styles.infoRow}>
//         <Text style={styles.label}>E-post:</Text>
//         <Text style={styles.value}>{item.email || "Ingen e-post"}</Text>
//       </View>

//       {/* Telefon */}
//       <View style={styles.infoRow}>
//         <Text style={styles.label}>Telefon:</Text>
//         <Text style={styles.value}>{item.phone || "–"}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Sökfält */}
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Sök medarbetare..."
//         value={searchTerm}
//         onChangeText={setSearchTerm}
//       />

//       <FlatList
//         data={filteredUsers}
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
//   searchInput: {
//     backgroundColor: "#FFF",
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 15,
//     borderColor: "#CCC",
//     borderWidth: 1,
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
//   name: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#0F172A",
//   },
//   infoRow: {
//     flexDirection: "row",
//     marginTop: 4,
//   },
//   label: {
//     fontWeight: "600",
//     color: "#475569",
//     width: 80,
//   },
//   value: {
//     color: "#0F172A",
//     flexShrink: 1,
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

import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from "react-native";
import useFetchUsers from "../../hooks/useFetchUsers";

export default function UsersIndexScreen() {
  const { users, loading, error } = useFetchUsers();
  const [searchTerm, setSearchTerm] = useState("");

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

  // Filtrera användare baserat på söktermen
  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    const name = user.name?.toLowerCase() || "";
    const email = user.email?.toLowerCase() || "";
    const roles = Array.isArray(user.role)
      ? user.role.join(", ").toLowerCase()
      : "";
    const unitName = user.unit?.name?.toLowerCase() || "";
    return (
      name.includes(term) ||
      email.includes(term) ||
      roles.includes(term) ||
      unitName.includes(term)
    );
  });

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name || "Namn saknas"}</Text>

      {/* Roll */}
      <View style={styles.infoRow}>
        <Text style={styles.label}>Roll:</Text>
        <Text style={styles.value}>
          {Array.isArray(item.role) && item.role.length > 0
            ? item.role.join(", ")
            : "–"}
        </Text>
      </View>

      {/* E-post */}
      <View style={styles.infoRow}>
        <Text style={styles.label}>E-post:</Text>
        <Text style={styles.value}>{item.email || "Ingen e-post"}</Text>
      </View>

      {/* Telefon */}
      <View style={styles.infoRow}>
        <Text style={styles.label}>Telefon:</Text>
        <Text style={styles.value}>{item.phone || "–"}</Text>
      </View>

      {/* Enhet */}
      <View style={styles.infoRow}>
        <Text style={styles.label}>Enhet:</Text>
        <Text style={styles.value}>{item.unit?.name || "–"}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Sökfält */}
      <TextInput
        style={styles.searchInput}
        placeholder="Sök medarbetare..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {users.length === 0 ? (
        <View style={styles.centerMessage}>
          <Text style={styles.infoText}>
            Det finns inga medarbetare att visa just nu.
          </Text>
        </View>
      ) : filteredUsers.length === 0 ? (
        <View style={styles.centerMessage}>
          <Text style={styles.infoText}>
            Ingen medarbetare matchar din sökning.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredUsers}
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
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  searchInput: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: "#CCC",
    borderWidth: 1,
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
    color: "#0F172A",
  },
  infoRow: {
    flexDirection: "row",
    marginTop: 4,
  },
  label: {
    fontWeight: "600",
    color: "#475569",
    width: 80,
    fontSize: 17,
  },
  value: {
    color: "#0F172A",
    flexShrink: 1,
    fontSize: 17,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centerMessage: {
    marginTop: 20,
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
    color: "#475569",
  },
  loadingText: {
    marginTop: 10,
    color: "#475569",
  },
  errorText: {
    color: "red",
  },
});
