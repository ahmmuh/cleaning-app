import { FontAwesome } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";
import React from "react";

function QRCodeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#003366",
        headerStyle: {
          backgroundColor: "#bff38c",
        },

        headerTitleStyle: "bold",
        headerTitle: "Skanna",
        headerShown: true,
      }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}

export default QRCodeLayout;
