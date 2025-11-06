// import { Stack } from "expo-router";
// import React from "react";
// import { View } from "react-native";

// function ChefLayout() {
//   return (
//     <Stack
//       screenOptions={{
//         headerShown: false,
//         headerStyle: {
//           backgroundColor: "#bff38c",
//         },

//         headerTitleStyle: {
//           fontWeight: "bold",
//         },
//       }}>
//       <Stack.Screen
//         name="index"
//         options={{
//           // title: "Chef",
//           headerShown: true,
//         }}
//       />
//     </Stack>
//   );
// }

// export default ChefLayout;

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";

function ChefLayout() {
  return (
    <>
      {/* Statusbaren med ljusa ikoner och blå bakgrund */}
      <StatusBar backgroundColor="#5381b1ff" style="light" />

      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#5381b1ff", // header under statusbaren
            height: 55, // själva headern
          },
          headerTitleAlign: "left",
          headerTintColor: "#fff",
        }}>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Enhetschef",
          }}
        />
      </Stack>
    </>
  );
}

export default ChefLayout;
