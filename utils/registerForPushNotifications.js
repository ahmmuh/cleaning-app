import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

export async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Du måste ge tillåtelse för att ta emot notiser!");
      return null;
    }
    
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Du måste använda en fysisk enhet för att få push-notiser.");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "standard",
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  return token;
}
