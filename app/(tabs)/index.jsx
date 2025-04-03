import { Link } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { StyleSheet, Text, View } from "react-native";

function HomeScreen() {
  return (
    <>
      <SafeAreaView style={styles.safeAreaContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Text>Welcome to Cleaning APP</Text>
            <Link href="/units">Alla enheter</Link>
            <Link href="/keys">Nycklar</Link>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },

  scrollContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20, // Ger extra padding runt scrollinnehållet
    alignItems: "center",
    justifyContent: "center",
  },
  safeAreaContainer: {
    flex: 1, // Gör så att SafeAreaView tar upp hela skärmen
    marginVertical: 20,
  },
});

export default HomeScreen;
