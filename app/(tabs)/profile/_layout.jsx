import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";

function ProfileLayout() {
  return (
    <>
      <StatusBar translucent={true} backgroundColor="#3e68abff" style="dark" />

      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#3e68abff",
            // height: 55,
          },
          headerTintColor: "#fff",
          headerTitleAlign: "left",
          headerTitle: () => (
            <View style={{ marginLeft: 16, justifyContent: "center", flex: 1 }}>
              <Text style={{ fontWeight: "bold", fontSize: 20, color: "#fff" }}>
                Min profil
              </Text>
            </View>
          ),
        }}>
        <Stack.Screen name="index" />
      </Stack>
    </>
  );
}

export default ProfileLayout;
