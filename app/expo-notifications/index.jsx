import { Text, View } from "react-native";
import usePushNotifications from "../../hooks/usePushNotifications";

function NotificationScreen() {
  const { expoPushToken, notification } = usePushNotifications();

  return (
    <View style={{ padding: 10 }}>
      {/* <Text>Expo Push Token: {expoPushToken}</Text> */}
      {notification && (
        <Text>Senaste notis: {notification.request.content.body}</Text>
      )}
    </View>
  );
}
export default NotificationScreen;
