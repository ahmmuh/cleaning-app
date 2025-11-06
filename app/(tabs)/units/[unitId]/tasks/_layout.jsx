// import { FontAwesome } from "@expo/vector-icons";
// import { Link, Stack, useRouter } from "expo-router";
// import Drawer from "expo-router/drawer";
// import React from "react";
// import { Button } from "react-native";

// function TaskLayout() {
//   const router = useRouter();

//   return (
//     <Stack
//       screenOptions={{
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
//           title: "Alla morgonjobb",
//           headerShown: true,
//         }}
//       />

//       <Stack.Screen
//         name="addTask"
//         options={{
//           title: "Skapa nytt morgonjobb",
//           headerShown: true,
//         }}
//       />
//       <Stack.Screen
//         name="editTask"
//         options={({ route }) => ({
//           title: route?.params?.title
//             ? `Redigera: ${route.params.title}`
//             : "Uppdatera morgonjobb",
//           headerShown: true,
//         })}
//       />
//     </Stack>
//   );
// }

// export default TaskLayout;

import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";

function TaskLayout() {
  const router = useRouter();

  const renderHeaderTitle = (title) => (
    <View style={{ marginLeft: 16, justifyContent: "center", flex: 1 }}>
      <Text style={{ fontWeight: "bold", fontSize: 20, color: "#fff" }}>
        {title}
      </Text>
    </View>
  );

  return (
    <>
      {/* Statusbaren med ljusa ikoner och blå bakgrund */}
      <StatusBar backgroundColor="#5381b1ff" style="light" />

      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#5381b1ff",
            height: 55,
          },
          headerTintColor: "#fff",
          headerTitleAlign: "left",
        }}>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: () => renderHeaderTitle("Alla morgonjobb"),
          }}
        />

        <Stack.Screen
          name="addTask"
          options={{
            headerTitle: () => renderHeaderTitle("Skapa nytt morgonjobb"),
          }}
        />

        <Stack.Screen
          name="editTask"
          options={({ route }) => ({
            headerTitle: () =>
              renderHeaderTitle(
                route?.params?.title
                  ? `Redigera: ${route.params.title}`
                  : "Uppdatera morgonjobb"
              ),
          })}
        />
      </Stack>
    </>
  );
}

export default TaskLayout;
