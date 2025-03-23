import { StyleSheet, Text, View } from "react-native";

function KeyScreen() {
  return (
    <View style={styles.container}>
      <Text>Nycklar .... 🔑</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default KeyScreen;
