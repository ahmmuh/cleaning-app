import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const ApartmentItem = ({ item }) => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: `/apartments/${item._id}`,
          params: {},
          state: { apartment: item },
        })
      }>
      <View style={styles.container}>
        <Text style={styles.title}>
          <Icon name="building" size={16} color="#333" />{" "}
          {item.apartmentLocation}
        </Text>
        <Text style={styles.detail}>
          <Icon name="key" size={14} color="#555" /> {item.keyLocation}
        </Text>
        <Text style={styles.detail}>
          <Icon name="user" size={14} color="#555" /> {item.assignedUnit.name}
        </Text>
        <Text style={styles.detail}>
          <Icon name="exclamation-circle" size={14} color="#d97706" />{" "}
          <Text style={styles.priority}>{item.priority}</Text>
        </Text>

        <Text style={[styles.status, getStatusStyle(item.status)]}>
          <Icon name="info-circle" size={14} /> {item.status}
        </Text>

        <Text style={styles.description}>{item.description}</Text>

        <Text style={styles.date}>
          <Icon name="calendar" size={13} /> Start:{" "}
          {new Date(item.startDate).toLocaleDateString("sv-SE")}
        </Text>
        <Text style={styles.date}>
          <Icon name="calendar-check-o" size={13} /> Slut:{" "}
          {new Date(item.endDate).toLocaleDateString("sv-SE")}
        </Text>
      </View>
    </Pressable>
  );
};

const getStatusStyle = (status) => {
  switch (status) {
    case "Färdigt":
      return { color: "green" };
    case "Ej påbörjat":
      return { color: "red" };
    case "Påbörjat":
      return { color: "orange" };
    default:
      return { color: "gray" };
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 8,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  detail: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  priority: {
    fontWeight: "bold",
    color: "#d97706",
  },
  status: {
    fontSize: 13,
    fontWeight: "bold",
    marginVertical: 8,
  },
  description: {
    fontSize: 14,
    color: "#444",
    marginTop: 6,
    marginBottom: 10,
  },
  date: {
    fontSize: 13,
    color: "#666",
  },
});

export default ApartmentItem;
