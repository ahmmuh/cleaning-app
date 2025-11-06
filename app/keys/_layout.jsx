// import { FontAwesome } from "@expo/vector-icons";
// import { Stack, Tabs } from "expo-router";
// import React from "react";
// import { TouchableOpacity } from "react-native";
// import { useRouter } from "expo-router";

// function KeyLayout() {
//   const router = useRouter();
//   const backButton = () => (
//     <TouchableOpacity
//       style={{ marginLeft: 16 }}
//       onPress={() => router.back()} // går tillbaka
//     >
//       <FontAwesome name="arrow-left" size={20} color="#003366" />
//     </TouchableOpacity>
//   );
//   return (
//     <Stack
//       screenOptions={{

//         tabBarActiveTintColor: "#003366",
//         headerStyle: {
//           backgroundColor: "#bff38c",
//         },

//         headerTitleStyle: "bold",
//       }}>
//       <Stack.Screen
//         name="index"
//         options={{
//           headerTitle: "Nycklar",
//           headerShown: true,
//         }}
//       />
//       <Stack.Screen
//         name="[keyId]/index"
//         options={{
//           headerTitle: "Uppdatera Nyckel",
//           headerShown: true,
//         }}
//       />

//       <Stack.Screen
//         name="[keyId]/keyQrScan"
//         options={{
//           headerTitle: "Skanna nyckel",
//           headerShown: true,
//         }}
//       />
//     </Stack>
//   );
// }

// export default KeyLayout;

import { FontAwesome } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { useRouter } from "expo-router";

function KeyLayout() {
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
            headerTitle: () => renderHeaderTitle("Nycklar"),
          }}
        />
        <Stack.Screen
          name="[keyId]/index"
          options={{
            headerTitle: () => renderHeaderTitle("Uppdatera Nyckel"),
            headerLeft: renderBackButton,
          }}
        />
        <Stack.Screen
          name="[keyId]/keyQrScan"
          options={{
            headerTitle: () => renderHeaderTitle("Skanna nyckel"),
            headerLeft: renderBackButton,
          }}
        />
      </Stack>
    </>
  );
}

export default KeyLayout;
