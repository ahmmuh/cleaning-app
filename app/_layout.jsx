import { Stack, Tabs } from "expo-router";
import ToastManager, { Toast } from "toastify-react-native";
import LoginScreen from "./auth";
import { ActivityIndicator, Text, View } from "react-native";
import AuthProvider from "./context/auth/AuthProvider";
import useAuth from "./context/auth/useAuth";
import PushTokenManager from "../utils/pushTokenManager";

export default function RootLayout() {
  return (
    <AuthProvider>
      <LayoutContent />
    </AuthProvider>
  );
}

const LayoutContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <ActivityIndicator size={30} color="green" />
      </View>
    );
  }

  return (
    <>
      <ToastManager />
      {user && <PushTokenManager />}
      {user ? (
        <>
          <Stack
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen
              name="(tabs)"
              options={{ headerTitle: "", headerShown: false }}
            />
          </Stack>
        </>
      ) : (
        <LoginScreen />
      )}
    </>
  );
};
