import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

function ListItem({ url, title, children }) {
  return (
    <Link href={url} style={styles.link}>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          <FontAwesome name="building" />
        </View>
        {children}
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  link: {
    textDecorationLine: "none", // Tar bort understrykning på länken
    marginBottom: 4,
  },
  container: {
    width: "100%", // Se till att listan tar hela skärmbredden
    backgroundColor: "#f2f2f2", // Ljus bakgrundsfärg
    borderRadius: 10, // Rundade hörn
    padding: 5, // Padding för att ge utrymme runt innehållet
    shadowColor: "#000", // Lägger till en skugga
    shadowOffset: { width: 0, height: 2 }, // Skugga nedåt
    shadowOpacity: 0.1, // Låg skugga
    shadowRadius: 3, // Skuggans spridning
    elevation: 2, // Android-specifik skugga
  },
  title: {
    fontSize: 18, // Storlek på titeln
    fontWeight: "bold", // Fet stil
    color: "#333", // Mörk färg på texten
    marginBottom: 5, // Avstånd mellan titel och innehåll
  },
  text: {
    fontSize: 14, // Liten textstorlek för övrigt innehåll
    color: "#555", // Mörkgrå textfärg
  },
});

export default ListItem;
