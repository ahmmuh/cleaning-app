// // app/clock/_layout.js
// import { Stack } from "expo-router";

// export default function ClockLayout() {
//   return (
//     <Stack>
//       <Stack.Screen
//         name="index"
//         options={{
//           title: "Stämpla In/Ut",
//           headerStyle: {
//             backgroundColor: "#bff38c",
//           },
//           headerTintColor: "#000",
//         }}
//       />
//     </Stack>
//   );
// }

// app/clock/_layout.js
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text } from "react-native";

export default function ClockLayout() {
  const renderHeaderTitle = (title) => (
    <View style={{ marginLeft: 16, justifyContent: "center", flex: 1 }}>
      <Text style={{ fontWeight: "bold", fontSize: 20, color: "#fff" }}>
        {title}
      </Text>
    </View>
  );

  return (
    <>
      {/* Statusbaren med ljusa ikoner */}
      <StatusBar backgroundColor="#5381b1ff" style="light" />

      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#5381b1ff",
            height: 55, // själva headern
          },
          headerTitleAlign: "left",
          headerTintColor: "#fff",
        }}>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: () => renderHeaderTitle("Stämpla In/Ut"),
          }}
        />
      </Stack>
    </>
  );
}
