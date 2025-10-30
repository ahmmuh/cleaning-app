/*
 ****** ========================================= Denna kodn används inte ******* */

import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Funktion som hanterar push-notiser i bakgrunden
export const backgroundPushHandler = async (remoteMessage) => {
  try {
    console.log("Bakgrundsnotis mottagen:", remoteMessage);

    // Hämta befintliga notiser
    const existing = await AsyncStorage.getItem("pushNotifications");
    let notifications = existing ? JSON.parse(existing) : [];

    // Lägg till den nya notisen
    notifications.push({
      id: remoteMessage.messageId || Date.now(),
      title: remoteMessage.notification?.title || "Ingen titel",
      body: remoteMessage.notification?.body || "Ingen text",
      date: new Date().toISOString(),
      data: remoteMessage.data || {},
    });

    // Spara tillbaka till AsyncStorage
    await AsyncStorage.setItem(
      "pushNotifications",
      JSON.stringify(notifications)
    );

    console.log("✅ Push-notis sparad i AsyncStorage");
  } catch (err) {
    console.error("⚠️ Kunde inte spara push-notis:", err);
  }
};
