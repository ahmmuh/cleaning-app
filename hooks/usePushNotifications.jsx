import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../utils/registerForPushNotifications";
import useFetchCurrentUser from "./useFetchCurrentUser";
import { saveExpoPushToken } from "../backend/userAPI";

export default function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState(null);
  const [notification, setNotification] = useState(null);
  const { user } = useFetchCurrentUser();

  useEffect(() => {
    // if (!user) return;
    registerForPushNotificationsAsync().then((token) => {
      console.log("Expo push token:", token);
      setExpoPushToken(token);
      saveExpoPushToken(token);
    });

    const subscription = Notifications.addNotificationReceivedListener((n) => {
      setNotification(n);
    });

    return () => subscription.remove();
  }, [user]);

  return { expoPushToken, notification };
}
