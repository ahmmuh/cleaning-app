import { FontAwesome } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import Drawer from "expo-router/drawer";
import React from "react";
import { Button } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function TaskDrawerLayout() {
  const router = useRouter();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          tabBarActiveTintColor: "#003366",
          headerStyle: {
            backgroundColor: "#bff38c",
          },

          headerTitleStyle: "bold",
          headerShown: true,
        }}>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Todo List",
            title: "Todo List",
            headerRight: () => (
              <Link href={"/units"} style={{ marginRight: 10 }}>
                <FontAwesome name="chevron-right" color={"green"} size={25} />
              </Link>
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

export default TaskDrawerLayout;
