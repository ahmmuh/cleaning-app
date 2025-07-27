import { Stack, Tabs } from "expo-router";
import ToastManager, { Toast } from "toastify-react-native";
import LoginScreen from "./auth";
import { Text, View } from "react-native";
import AuthProvider from "./context/auth/AuthProvider";
import useAuth from "./context/auth/useAuth";

export default function RootLayout() {


  
  return (
    <AuthProvider>
      <LayoutContent />
    </AuthProvider>
  );
}

const LayoutContent = () => {
  const { user } = useAuth();
  return (
    <>
      <ToastManager />
      {user ? (
        <Stack
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            name="(tabs)"
            options={{ headerTitle: "", headerShown: false }}
          />
        </Stack>
      ) : (
        <LoginScreen />
      )}
    </>
  );
};
