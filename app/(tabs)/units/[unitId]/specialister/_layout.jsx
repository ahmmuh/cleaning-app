import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

function SpecialistLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#003366",
        headerStyle: {
          backgroundColor: "#bff38c",
        },

        headerTitleStyle: "bold",
        headerTitle: "Specialstädare",
        headerShown: true,
      }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}

export default SpecialistLayout;
