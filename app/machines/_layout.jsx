// import { FontAwesome } from "@expo/vector-icons";
// import { Stack } from "expo-router";
// import React from "react";
// import { TouchableOpacity } from "react-native";
// import { useRouter } from "expo-router";

// function MachineLayout() {
//   const router = useRouter();
//   const backButton = () => (
//     <TouchableOpacity style={{ marginLeft: 16 }} onPress={() => router.back()}>
//       <FontAwesome name="arrow-left" size={20} color="#003366" />
//     </TouchableOpacity>
//   );

//   return (
//     <Stack
//       screenOptions={{
//         tabBarActiveTintColor: "#003366",
//         headerStyle: { backgroundColor: "#bff38c" },
//         headerTitleStyle: { fontWeight: "bold" },
//       }}>
//       <Stack.Screen
//         name="index"
//         options={{ headerTitle: "Maskiner", headerShown: true }}
//       />
//       <Stack.Screen
//         name="[machineId]/index"
//         options={{ headerTitle: "Maskindetaljer", headerShown: true }}
//       />
//       <Stack.Screen
//         name="[machineId]/machineScan"
//         options={{ headerTitle: "Skanna maskin", headerShown: true }}
//       />
//     </Stack>
//   );
// }

// export default MachineLayout;

import { FontAwesome } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { useRouter } from "expo-router";

function MachineLayout() {
  const router = useRouter();

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
      {/* Statusbar med ljusa ikoner */}
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
            headerTitle: () => renderHeaderTitle("Maskiner"),
          }}
        />
        <Stack.Screen
          name="[machineId]/index"
          options={{
            headerTitle: () => renderHeaderTitle("Maskindetaljer"),
            headerLeft: renderBackButton,
          }}
        />
        <Stack.Screen
          name="[machineId]/machineScan"
          options={{
            headerTitle: () => renderHeaderTitle("Skanna maskin"),
            headerLeft: renderBackButton,
          }}
        />
      </Stack>
    </>
  );
}

export default MachineLayout;
