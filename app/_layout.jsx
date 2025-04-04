import { Stack, Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        tabBarActiveTintColor: "#003366",
        headerStyle: {
          backgroundColor: "#bff38c",
        },

        headerTitleStyle: "bold",
      }}>
      <Stack.Screen
        name="(tabs)"
        options={{ headerTitle: "", headerShown: false }}
      />
    </Stack>
  );
}
