import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import useFetchKeys from "../../hooks/useFetchKeys";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import KeyItem from "./keyItem";
import useFetchUser from "../../hooks/useFetchCurrentUser";

function KeyScreen() {
  const { keys, loading, error } = useFetchKeys();
  const { user } = useFetchUser();

  if (loading) {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={{
          backgroundColor: "red",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Text style={{ fontSize: 16 }}>Fel vid hämtning av Nycklar</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeViewContainer}>
      <FlatList
        data={keys}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <KeyItem item={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeViewContainer: {
    paddingVertical: 10,
  },
});

export default KeyScreen;
