// import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
// import useFetchKeys from "../../hooks/useFetchKeys";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { FlatList } from "react-native";
// import KeyItem from "./keyItem";
// import useFetchUser from "../../hooks/useFetchCurrentUser";

// function KeyScreen() {
//   const { keys, loading, error } = useFetchKeys();
//   const { user } = useFetchUser();

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.safeAreaContainer}>
//         <ActivityIndicator size="large" color="#007BFF" />
//       </SafeAreaView>
//     );
//   }

//   if (error) {
//     return (
//       <SafeAreaView
//         style={{
//           backgroundColor: "red",
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//         }}>
//         <Text style={{ fontSize: 16 }}>Fel vid hämtning av Nycklar</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.safeViewContainer}>
//       <FlatList
//         data={keys}
//         keyExtractor={(item) => item._id}
//         renderItem={({ item }) => <KeyItem item={item} />}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeViewContainer: {
//     paddingVertical: 10,
//   },
// });

// export default KeyScreen;

//Ny kod med sök funktion
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker"; // npm install @react-native-picker/picker
import useFetchKeys from "../../hooks/useFetchKeys";
import useFetchUser from "../../hooks/useFetchCurrentUser";
import useFetchUnits from "../../hooks/useFetchUnits";
import KeyItem from "./keyItem";

function KeyScreen() {
  const { keys, loading, error } = useFetchKeys();
  const { user } = useFetchUser();
  const { units } = useFetchUnits();

  const [selectedUnit, setSelectedUnit] = useState("");
  const [displayKeys, setDisplayKeys] = useState([]);

  // Uppdatera listan när man väljer unit
  useEffect(() => {
    if (!selectedUnit) {
      // Visa alla nycklar
      setDisplayKeys(keys);
    } else {
      // Visa nycklar som tillhör vald unit
      const relatedKeys = keys.filter(
        (key) => key.unit?._id === selectedUnit || key.unit === selectedUnit
      );
      setDisplayKeys(relatedKeys);
    }
  }, [selectedUnit, keys]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Fel vid hämtning av nycklar</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeViewContainer}>
      <Text style={styles.title}>Filtrera efter enhet:</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedUnit}
          onValueChange={(value) => setSelectedUnit(value)}>
          <Picker.Item label="-- Visa alla nycklar --" value="" />
          {units?.map((unit) => (
            <Picker.Item key={unit._id} label={unit.name} value={unit._id} />
          ))}
        </Picker>
      </View>

      {/* Om vald unit har inga nycklar */}
      {selectedUnit && displayKeys.length === 0 ? (
        <View style={styles.noKeysContainer}>
          <Text style={styles.noKeysText}>
            🚪 Denna enhet har inga registrerade nycklar just nu.
          </Text>
        </View>
      ) : (
        <FlatList
          data={displayKeys}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <KeyItem item={item} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  safeViewContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    marginBottom: 15,
  },
  noKeysContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  noKeysText: {
    fontSize: 16,
    color: "#777",
    fontStyle: "italic",
  },
  errorContainer: {
    backgroundColor: "red",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default KeyScreen;
