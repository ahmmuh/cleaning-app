import { Stack } from "expo-router";
import React from "react";
function AllaEnheterSTackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4dd",
        headerStyle: {
          backgroundColor: "#81C784",
        },

        headerTitleStyle: "bold",
      }}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Alla enheter",
          headerShown: true,
        }}
      />
    </Stack>
  );
}

export default AllaEnheterSTackLayout;
