import { FontAwesome } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";
import React from "react";

function KeyLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Nycklar",
          tabBarIcon: ({ color, size }) => {
            <FontAwesome name="key" size={25} color={color} />;
          },
        }}
      />
    </Stack>
  );
}

export default KeyLayout;
