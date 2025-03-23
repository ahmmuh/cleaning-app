import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{ headerShown: true }}>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Enheter",
            title: "Alla enheter",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

export default DrawerLayout;
