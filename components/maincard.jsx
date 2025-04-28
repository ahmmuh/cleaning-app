// import { Link } from "expo-router";
// import React from "react";
// import { StyleSheet, Text } from "react-native";
// import { View } from "react-native";

// function MainCard({ url, title, name, email, phone, children }) {
//   return (
//     <View style={styles.container}>
//       <View title={title} style={styles.card}>
//         <Link href={""} style={styles.link}>
//           <Text>Namn: {name}</Text>
//         </Link>
//         <Link href={""} style={styles.link}>
//           <Text>Telefon: {phone}</Text>
//         </Link>
//         <Link href={""} style={styles.link}>
//           <Text>E-post {email}</Text>
//         </Link>
//         {children}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   card: {
//     backgroundColor: "#ded",
//     padding: 30,
//     height: "50%",
//     margin: 20,
//     borderRadius: 10,
//     shadowColor: "#ded",
//     shadowOffset: { width: 0, height: 5 },
//     shadowRadius: 7,
//   },
//   link: {
//     marginBottom: 2,
//     fontSize: 15,
//     color: "blue",
//     padding: 5,
//     border: 1,
//     borderBottomWidth: 1,
//     borderBottomColor: "#000",
//     paddingBottom: 20,
//     cursor: "pointer",
//   },
// });

// export default MainCard;

import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

function MainCard({ url, title, name, email, phone, children }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{title}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Namn:</Text>
          <Text style={styles.value}>{name}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Telefon:</Text>
          <Text style={styles.value}>{phone}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>E-post:</Text>
          <Text style={styles.value}>{email}</Text>
        </View>

        {/* Eventuella extra länkar eller knappar */}
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#f9fafe", // ljus bakgrund
  },
  card: {
    backgroundColor: "#fff", // vit kort
    padding: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4, // Android shadow
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: "#1e293b",
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
    color: "#475569",
    width: 90, // fixad bredd så allt linjerar
  },
  value: {
    fontSize: 16,
    color: "#1e293b",
    flexShrink: 1, // så text inte går utanför
  },
});

export default MainCard;
