import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";

function AllaEnheterStackLayout() {
  return (
    <>
      <StatusBar backgroundColor="#5381b1ff" style="light" />

      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "#5381b1ff",
          },
          headerTitleAlign: "left",
          headerTintColor: "#fff",
        }}>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            headerTitle: () => (
              <View
                style={{ marginLeft: 16, justifyContent: "center", flex: 1 }}>
                <Text
                  style={{ fontWeight: "bold", fontSize: 20, color: "#fff" }}>
                  Alla enheter
                </Text>
              </View>
            ),
          }}
        />
      </Stack>
    </>
  );
}

export default AllaEnheterStackLayout;
