import { useSearchParams } from "expo-router";
import { Text, View } from "react-native";

function WorkPlaceScreen() {
  const { unitId } = useSearchParams();
  return (
    <View>
      <Text>Work Place Lista {unitId}</Text>
    </View>
  );
}

export default WorkPlaceScreen;
