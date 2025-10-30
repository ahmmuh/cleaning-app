//NYare kod:
import React, { useState, useMemo, useCallback } from "react";
import {
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import MachineItem from "./machineItem";
import useFetchMachines from "../../hooks/useFetchMachines";
import { useFocusEffect } from "expo-router";

export default function MachineIndex() {
  const { fetchMachines, machines, loading, error } = useFetchMachines();
  const [selectedUnit, setSelectedUnit] = useState("");

  useFocusEffect(
    useCallback(() => {
      fetchMachines();
    }, [])
  );
  const units = useMemo(() => {
    if (!machines) return [];
    const seen = new Set();
    return machines
      ?.map((m) => m.unitId)
      .filter((u) => u && u._id && !seen.has(u._id) && seen.add(u._id));
  }, [machines]);

  // Filtrera maskiner
  const filteredMachines = useMemo(() => {
    if (!machines) return [];
    return selectedUnit
      ? machines?.filter((m) => m.unitId?._id === selectedUnit)
      : machines;
  }, [machines, selectedUnit]);

  if (loading)
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Laddar maskiner...</Text>
      </SafeAreaView>
    );

  if (error)
    return (
      <SafeAreaView style={styles.center}>
        <Text style={{ color: "red" }}>Fel vid hämtning av maskiner</Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={{ flex: 1, paddingVertical: 10 }}>
      {/* Dropdown */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedUnit}
          onValueChange={(itemValue) => setSelectedUnit(itemValue)}
          mode="dropdown">
          <Picker.Item label="Alla enheter" value="" />
          {units?.map((unit) => (
            <Picker.Item
              key={unit._id}
              label={unit.name || "Okänd"}
              value={unit._id}
            />
          ))}
        </Picker>
      </View>

      <FlatList
        data={filteredMachines}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <MachineItem item={item} />}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Inga maskiner hittades
          </Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  pickerContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 8,
    marginBottom: 8,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
  },
});
