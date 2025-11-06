// import React from "react";
// import { Stack } from "expo-router";

// export default function UsersLayout() {
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
//         // contentStyle: {
//         //   backgroundColor: "#bff38c",
//         // },
//       }}>
//       <Stack.Screen
//         name="index"
//         options={{
//           title: "Medarbetare",
//         }}
//       />
//       <Stack.Screen
//         name="[id]"
//         options={{
//           title: "Användardetaljer",
//           presentation: "card",
//         }}
//       />
//     </Stack>
//   );
// }

import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, View, Text } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function UsersLayout() {
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
      {/* <StatusBar backgroundColor="#3e68abff" style="light" /> */}

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
            headerTitle: () => renderHeaderTitle("Medarbetare"),
          }}
        />
        <Stack.Screen
          name="[id]"
          options={{
            headerTitle: () => renderHeaderTitle("Användardetaljer"),
            headerLeft: renderBackButton,
            presentation: "card",
          }}
        />
      </Stack>
    </>
  );
}
