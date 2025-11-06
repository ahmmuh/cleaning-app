import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import ProfileScreen from "./profile";

function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#003366",
        headerStyle: {
          backgroundColor: "#3e68abff",
        },

        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTintColor: "#fff",
        tabBarItemStyle: {
          flexDirection: "row",
          justifyContent: "space-between",
        },
        tabBarScrollEnabled: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Start ",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome size={25} name="home" color={color} />
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

      <Tabs.Screen
        name="profile"
        options={{
          title: "Min profil",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome size={25} name="heart" color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

export default TabLayout;
