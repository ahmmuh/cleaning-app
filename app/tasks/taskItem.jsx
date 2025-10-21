import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import useFetchCurrentUser from "../../hooks/useFetchCurrentUser";

function TaskItem({ item }) {
  const { user } = useFetchCurrentUser();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.location}>{item.address}</Text>

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

      {item.status === "Ej påbörjat" && (
        <Text style={styles.createAt}>
          Skapad: {new Date(item.createdAt).toLocaleString("sv-SE")}
        </Text>
      )}

      {(item.status === "Påbörjat" || item.status === "Färdigt") && (
        <Text style={styles.updatedAt}>
          Senast ändrat: {new Date(item.updatedAt).toLocaleString("sv-SE")}
        </Text>
      )}

      {/* Länk till redigering */}
      {user &&
        user.unit ===
          (typeof item.unit === "string" ? item.unit : item.unit?._id) && (
          <View style={styles.linkContainer}>
            <Link href={`/tasks/${item._id}/editTask`} style={styles.editLink}>
              <FontAwesome name="edit" size={16} color="white" />
              <Text style={styles.editLinkText}> Redigera</Text>
            </Link>
          </View>
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
  },
  assignedTo: {
    fontSize: 14,
    color: "#333",
    marginBottom: 2,
    fontWeight: "bold",
  },
  updatedAt: {
    fontSize: 12,
    color: "#232020ff",
  },
  createAt: {
    fontSize: 12,
    color: "#232020ff",
  },
  linkContainer: {
    marginTop: 12,
    alignItems: "flex-end",
  },
  editLink: {
    flexDirection: "row",
    backgroundColor: "green",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  editLinkText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default TaskItem;
