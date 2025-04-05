import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View } from "react-native";

function ChefScreen() {
  const router = useRouter();
  const { chefId } = useLocalSearchParams();
  console.log("chefID", chefId);
  console.log("Current URL:", router.asPath); // Loggar nuvarande URL för att kolla att query-parametern finns

  return (
    <View>
      <Text>Chef lista</Text>
    </View>
  );
}

export default ChefScreen;
