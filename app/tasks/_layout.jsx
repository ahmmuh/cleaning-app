// import { Stack } from "expo-router";

// const TaskLayout = () => {
//   const date = new Date().toLocaleDateString("sv-SE", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//   });
//   return (
//     <Stack
//       screenOptions={{
//         tabBarActiveTintColor: "#003366",
//         headerStyle: {
//           backgroundColor: "#bff38c",
//         },
//         headerTitleStyle: { fontWeight: "bold", fontSize: 16 },
//       }}>
//       <Stack.Screen
//         name="index"
//         options={{
//           headerShown: true,
//           headerTitle: `Alla morgonjobb för ${date}`,
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
//         options={{
//           title: "Uppdatera morgonjobb",
//           headerShown: true,
//         }}
//       />
//     </Stack>
//   );
// };

// export default TaskLayout;

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const TaskLayout = () => {
  const router = useRouter();
  const date = new Date().toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const renderHeaderTitle = (title) => (
    <View style={{ marginLeft: 16, justifyContent: "center", flex: 1 }}>
      <Text style={{ fontWeight: "bold", fontSize: 20, color: "#fff" }}>
        {title}
      </Text>
    </View>
  );

  const renderBackButton = () => (
    <TouchableOpacity style={{ marginLeft: 16 }} onPress={() => router.back()}>
      <FontAwesome name="arrow-left" size={20} color="#fff" />
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar backgroundColor="#5381b1ff" style="light" />

      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#5381b1ff",
            height: 55,
          },
          headerTitleAlign: "left",
          headerTintColor: "#fff",
        }}>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: () => renderHeaderTitle(`Alla morgonjobb för ${date}`),
          }}
        />
        <Stack.Screen
          name="addTask"
          options={{
            headerTitle: () => renderHeaderTitle("Skapa nytt morgonjobb"),
            headerLeft: renderBackButton,
          }}
        />
        <Stack.Screen
          name="editTask"
          options={{
            headerTitle: () => renderHeaderTitle("Uppdatera morgonjobb"),
            headerLeft: renderBackButton,
          }}
        />
      </Stack>
    </>
  );
};

export default TaskLayout;
