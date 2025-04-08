import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

function KeyLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Nycklar",
          tabBarIcon: ({ color, size }) => {
            <FontAwesome name="key" size={25} color={color} />;
          },
        }}
      />
    </Tabs>
  );
}

export default KeyLayout;
