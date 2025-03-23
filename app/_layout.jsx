import { Stack, Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerTitle: "", headerShown: false }}
      />
    </Stack>
  );
}
