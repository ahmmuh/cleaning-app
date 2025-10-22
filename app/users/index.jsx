import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import useFetchUsers from "../../hooks/useFetchUsers";

export default function UserList() {
  const { users, loading, error } = useFetchUsers();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Fel vid hämtning av användare</Text>
      </View>
    );
  }

  if (!users || users.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Inga användare att visa</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.name}>{item.name || "Namn saknas"}</Text>
          <Text style={styles.email}>{item.email || "Ingen email"}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  error: {
    color: "red",
    fontSize: 16,
    fontWeight: "600",
  },
  list: {
    padding: 16,
  },
  item: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  email: {
    fontSize: 14,
    color: "#555",
  },
});
