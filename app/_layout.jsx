import { Stack, Tabs } from "expo-router";
import ToastManager, { Toast } from "toastify-react-native";
import LoginScreen from "./auth";
import { Text, View } from "react-native";
import AuthProvider from "./context/auth/AuthProvider";
import useAuth from "./context/auth/useAuth";
import { ActivityIndicator } from "react-native-web";
import usePushNotifications from "../hooks/usePushNotifications";

export default function RootLayout() {
  const { expoPushToken, notification } = usePushNotifications();
  return (
    <AuthProvider>
      <LayoutContent
        expoPushToken={expoPushToken}
        notification={notification}
      />
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

  console.log("expoPushToken: ", expoPushToken);
  console.log("notification: ", notification);

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
