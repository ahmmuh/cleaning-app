import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Welcome to Cleaning APP</Text>
      <Link href="/units">Alla enheter</Link>
      <Link href="/keys">Nycklar</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
