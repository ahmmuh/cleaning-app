import { Stack, Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        tabBarActiveTintColor: "#4dd",
        headerStyle: {
          backgroundColor: "#81C784",
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
