import React from "react";
import { StyleSheet, Text, View } from "react-native";

function Card({ title, children, ...props }) {
  return (
    <View style={styles.cardContainer} {...props}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#ded",
    borderRadius: 10,
    padding: 40,
    // marginVertical: 3,
    width: "90%",
    // minHeight: "36%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 10,
  },
  title: {
    color: "#767",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 0,
    // marginTop: -10,
  },
  content: { flex: 1 },
});
export default Card;
