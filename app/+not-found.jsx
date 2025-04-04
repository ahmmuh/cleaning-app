import React from "react";
import { View, Text } from "react-native";

function NotFound() {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ color: "red", fontSize: 20, fontWeight: "bold" }}>
        Not found
      </Text>
    </View>
  );
}

export default NotFound;
