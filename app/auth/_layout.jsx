import { FontAwesome } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";
import React from "react";

function LoginLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#003366",
        headerShown: true,
        headerStyle: {
          backgroundColor: "#bff38c",
        },

        headerTitleStyle: "bold",
        headerShown: false,
      }}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Logga in",
          headerShown: true,
        }}
      />
    </Stack>
  );
}

export default LoginLayout;
