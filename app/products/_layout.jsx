import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
function ProductLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen name="index" />
        <Drawer.Screen name="productDetails" />
      </Drawer>
    </GestureHandlerRootView>
  );
}

export default ProductLayout;
