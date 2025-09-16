import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

function ChefLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "#bff38c",
        },

        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Chef",
          headerShown: true,
        }}
      />
    </Stack>
  );
}

export default ChefLayout;
