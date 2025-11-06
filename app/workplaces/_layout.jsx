// import React from "react";
// import { Stack } from "expo-router";

// export default function WorkplacesLayout() {
//   return (
//     <Stack
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: "#bff38c",
//         },
//         headerTintColor: "#000",
//         headerTitleStyle: {
//           fontWeight: "700",
//         },
//       }}>
//       <Stack.Screen
//         name="index"
//         options={{
//           title: "Arbetsplatser",
//         }}
//       />
//     </Stack>
//   );
// }

import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";

export default function WorkplacesLayout() {
  return (
    <>
      {/* Statusbar med ljusa ikoner */}
      <StatusBar backgroundColor="#bff38c" style="light" />

      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#5381b1ff",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "left",
          headerTitle: () => (
            <View style={{ marginLeft: 16, justifyContent: "center", flex: 1 }}>
              <Text style={{ fontWeight: "bold", fontSize: 20, color: "#fff" }}>
                Alla objekt
              </Text>
            </View>
          ),
        }}>
        <Stack.Screen name="index" />
      </Stack>
    </>
  );
}
