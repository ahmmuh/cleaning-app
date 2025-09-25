import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import useAuth from "../app/context/auth/useAuth";
import { saveExpoPushToken } from "../backend/userAPI";
import { registerForPushNotificationsAsync } from "./registerForPushNotifications";

export default function PushTokenManager() {
  const { user } = useAuth();
  const [expoPushToken, setExpoPushToken] = useState(null);

  useEffect(() => {
    // Kör endast när user finns
    if (!user) return;

    const registerToken = async () => {
      const token = await registerForPushNotificationsAsync();
      if (token) {
        console.log("Expo push token:", token);
        setExpoPushToken(token);
        await saveExpoPushToken(token); // backend call med JWT
      }
    };

    registerToken();

    // Lyssna på inkommande notiser
    const subscription = Notifications.addNotificationReceivedListener((n) => {
      console.log("Notification mottagen:", n);
    });

    return () => subscription.remove();
  }, [user]);

  return null; // Ingen UI behövs
}
