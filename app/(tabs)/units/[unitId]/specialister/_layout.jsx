import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

function SpecialistLayout() {
  return (
    <Stack
      screenOptions={{
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
          title: "Specialstädare",
          headerShown: true,
        }}
      />
    </Stack>
  );
}

export default SpecialistLayout;
