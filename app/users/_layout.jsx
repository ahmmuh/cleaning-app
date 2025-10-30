import React from "react";
import { Stack } from "expo-router";

export default function UsersLayout() {
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
        // contentStyle: {
        //   backgroundColor: "#bff38c",
        // },
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Medarbetare",
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Användardetaljer",
          presentation: "card",
        }}
      />
    </Stack>
  );
}
