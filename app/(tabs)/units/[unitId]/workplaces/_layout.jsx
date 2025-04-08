import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

function WorkPlaceLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#003366",
        headerStyle: {
          backgroundColor: "#bff38c",
        },

        headerTitleStyle: "bold",
        headerTitle: "Mina objekt",
        headerShown: true,
      }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}

export default WorkPlaceLayout;
