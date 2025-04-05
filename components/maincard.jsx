import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";

function MainCard({ url, title, name, email, phone }) {
  return (
    <View style={styles.container}>
      <View title={title} style={styles.card}>
        <Link href={""} style={styles.link}>
          <Text>Namn: {name}</Text>
        </Link>
        <Link href={""} style={styles.link}>
          <Text>Telefon: {phone}</Text>
        </Link>
        <Link href={""} style={styles.link}>
          <Text>E-post {email}</Text>
        </Link>
        <Link href={url}>Tillbaka</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: "#ded",
    padding: 30,
    height: "50%",
    margin: 20,
    borderRadius: 10,
    shadowColor: "#ded",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 7,
  },
  link: {
    marginBottom: 2,
    fontSize: 15,
    color: "blue",
    padding: 5,
    border: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 20,
    cursor: "pointer",
  },
});

export default MainCard;
