import { FontAwesome } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

function KeyLayout() {
  const router = useRouter();
  const backButton = () => (
    <TouchableOpacity
      style={{ marginLeft: 16 }}
      onPress={() => router.back()} // går tillbaka
    >
      <FontAwesome name="arrow-left" size={20} color="#003366" />
    </TouchableOpacity>
  );
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
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="[keyId]/keyQrScan"
        options={{
          headerTitle: "Skanna nyckel",
          headerShown: true,
        }}
      />
    </Stack>
  );
}

export default KeyLayout;
