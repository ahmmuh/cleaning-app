import { FontAwesome } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";
import React from "react";

function LoginLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}

export default LoginLayout;
