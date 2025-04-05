import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

function TodoScreen() {
  const { unitId } = useLocalSearchParams();
  return (
    <View>
      <Text>Todo Lista {unitId}</Text>
    </View>
  );
}

export default TodoScreen;
