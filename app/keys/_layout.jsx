import { FontAwesome } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";
import React from "react";

function KeyLayout() {
  return (
    <Stack
      screenOptions={{
        tabBarActiveTintColor: "#003366",
        headerStyle: {
          backgroundColor: "#bff38c",
        },

        headerTitleStyle: "bold",
      }}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Nycklar",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="[keyId]/index"
        options={{
          headerTitle: "Uppdatera Nyckel",
        }}
      />

      <Stack.Screen
        name="[keyId]/keyQrScan"
        options={{
          headerTitle: "Skanna nyckel",
        }}
      />
    </Stack>
  );
}

export default KeyLayout;
