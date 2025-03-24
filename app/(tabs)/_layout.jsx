import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "red" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Start",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome size={25} name="home" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="keys"
        options={{
          title: "Nyckel hantering",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome size={25} name="key" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="units"
        options={{
          title: "Alla enheter",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome size={25} name="building" color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

export default TabLayout;
