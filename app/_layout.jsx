import { Stack, Tabs } from "expo-router";
import ToastManager, { Toast } from "toastify-react-native";

export default function RootLayout() {
  return (
    <>
      <ToastManager />
      <Stack
        screenOptions={{
          tabBarActiveTintColor: "#003366",
          headerShown: false,

          headerStyle: {
            backgroundColor: "#bff38c",
          },

          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}>
        <Stack.Screen
          name="(tabs)"
          options={{ headerTitle: "", headerShown: false }}
        />
      </Stack>
    </>
  );
}
