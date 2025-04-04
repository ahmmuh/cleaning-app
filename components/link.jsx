import React from "react";
import { StyleSheet } from "react-native";
import { Link } from "expo-router";

function MainLink({ title, url }) {
  return <Link href={url} title={title}></Link>;
}

const styles = StyleSheet.create({
  linkContainer: {
    fontSize: 12,
    color: "blue",
    fontWeight: "bold",
    marginBottom: 3,
    padding: 6,
  },
});
export default MainLink;
