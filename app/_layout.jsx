import { Stack, Tabs } from "expo-router";
import ToastManager, { Toast } from "toastify-react-native";
import LoginScreen from "./auth";
import { ActivityIndicator, StatusBar, Text, View } from "react-native";
import AuthProvider from "./context/auth/AuthProvider";
import useAuth from "./context/auth/useAuth";
// import { useKeepAwake } from "expo-keep-awake";
import NotificationScreen from "./expo-notifications";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../rensa_cache/clear_cache";
import { useEffect } from "react";

export default function RootLayout() {
  // useKeepAwake();
  useEffect(() => {
    queryClient.clear();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LayoutContent />
      </AuthProvider>
    </QueryClientProvider>
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
      <StatusBar backgroundColor="#bff38c" barStyle="dark-content" />
      <ToastManager />
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
