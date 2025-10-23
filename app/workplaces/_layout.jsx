import React from "react";
import { Stack } from "expo-router";

export default function WorkplacesLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#bff38c",
        },
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "700",
        },
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Arbetsplatser",
        }}
      />
    </Stack>
  );
}
