import React from "react";
import { Text, View, StyleSheet } from "react-native";

// Funktion för att få rätt färg beroende på status
// const getStatusColor = (status) => {
//   switch (status) {
//     case "Påbörjad":
//       return "#FFA500"; // Orange
//     case "Ej påbörjad":
//       return "#FF4C4C"; // Röd
//     case "Färdig":
//       return "#4CAF50"; // Grön
//     default:
//       return "#808080"; // Grå fallback
//   }
// };

function TaskItem({ item }) {
  // const statusColor = getStatusColor(item.status);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text
        style={{
          fontSize: 14,
          marginBottom: 3,
        }}>
        {item.location}
      </Text>

      <Text style={styles.assignedTo}>Tilldelad: {item.unit?.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.statusContainer}>
        {item.status === "Ej påbörjat" && (
          <Text style={[styles.statusText, { color: "red" }]}>
            {item.status}
          </Text>
        )}

        {item.status === "Påbörjat" && (
          <Text style={[styles.statusText, { color: "orange" }]}>
            {item.status}
          </Text>
        )}

        {item.status === "Färdigt" && (
          <Text style={[styles.statusText, { color: "green" }]}>
            {item.status}
          </Text>
        )}
      </View>

      {item.status === "Färdigt" && (
        <Text style={styles.updatedAt}>
          senast ändrat: {new Date(item.updatedAt).toLocaleString("sv-SE")}
        </Text>
      )}

      {item.status === "Ej påbörjat" && (
        <Text style={styles.createAt}>
          Skapad: {new Date(item.updatedAt).toLocaleString("sv-SE")}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
    fontWeight: "bold",
  },
  statusContainer: {
    paddingVertical: 4,
    paddingHorizontal: 2,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  statusText: {
    fontWeight: "bold",
    // marginLeft: 0,
  },
  assignedTo: {
    fontSize: 14,
    color: "#333",
    marginBottom: 2,
    fontWeight: "bold",
  },
  updatedAt: {
    fontSize: 12,
    color: "#999",
  },
});

export default TaskItem;
