import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack, useRouter } from "expo-router";
import Drawer from "expo-router/drawer";
import React from "react";
import { Button } from "react-native";

function TaskLayout() {
  const router = useRouter();

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
          title: "Alla morgonjobb",
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="addTask"
        options={{
          title: "Skapa nytt morgonjobb",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="editTask"
        options={({ route }) => ({
          title: route?.params?.title
            ? `Redigera: ${route.params.title}`
            : "Uppdatera morgonjobb",
          headerShown: true,
        })}
      />
    </Stack>
  );
}

export default TaskLayout;
