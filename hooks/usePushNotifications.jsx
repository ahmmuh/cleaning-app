import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../utils/registerForPushNotifications";

export default function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);

      // 👇 här kan du spara token i backend
      // fetch("http://localhost:8000/api/save-token", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ token }),
      // });
    });

    const subscription = Notifications.addNotificationReceivedListener((n) => {
      setNotification(n);
    });

    return () => subscription.remove();
  }, []);

  return { expoPushToken, notification };
}
