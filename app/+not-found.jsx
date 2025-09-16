import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

function NotFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sidan hittades inte</Text>
      <Text style={styles.subtitle}>
        Tyvärr, sidan du letar efter finns inte.
      </Text>

      <Link href="/" style={styles.homeButton}>
        <Text style={styles.homeButtonText}> Till startsidan</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "red",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  homeButton: {
    backgroundColor: "#47703cff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  homeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NotFound;
