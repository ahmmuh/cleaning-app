import * as Notifications from "expo-notifications";
import { Button, View } from "react-native";
import React, { useEffect } from "react";
import * as Device from "expo-device";

export default function TestNotification() {
  useEffect(() => {
    const requestPermissions = async () => {
      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          alert("Du måste ge tillåtelse för notiser!");
        }
      } else {
        alert("Fungerar endast på fysisk enhet.");
      }
    };

    requestPermissions();
  }, []);

  const sendTestNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hej! 👋",
        body: "Detta är en testnotis direkt från koden",
        sound: "default",
      },
      trigger: null,
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Skicka notis" onPress={sendTestNotification} />
    </View>
  );
}
