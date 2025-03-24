import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
function SingelDrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: true,
        }}>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Singel enhet",
            title: "Enhet",
          }}
        />

        <Drawer.Screen
          name="chef"
          options={{
            drawerLabel: "Chef",
            title: "Chef",
          }}
        />

        <Drawer.Screen
          name="specialist"
          options={{
            drawerLabel: "Specialister",
            title: "Specialister",
          }}
        />

        <Drawer.Screen
          name="task"
          options={{
            drawerLabel: "Att göra",
            title: "Att göra",
          }}
        />

        <Drawer.Screen
          name="workplace"
          options={{
            drawerLabel: "Mina objekt",
            title: "Mina objekt",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

export default SingelDrawerLayout;
