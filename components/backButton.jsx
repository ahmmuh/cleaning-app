import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

function BackButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <FontAwesome name="chevron-left" size={20} color={"green"} />
      <Text style={styles.buttonText}>Tillbaka</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 15,
    color: "#000",
  },
});

export default BackButton;
