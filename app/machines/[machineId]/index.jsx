import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  borrowMachine,
  returnMachine,
  getMachineByID,
} from "../../../backend/machineAPI";
import { FontAwesome } from "@expo/vector-icons";
import useFetchMachines from "../../../hooks/useFetchMachines";
const router = useRouter();

export default function MachineDetailScreen() {
  const { machineId } = useLocalSearchParams();
  const [machine, setMachine] = useState(null);
  const [loading, setLoading] = useState(true);

  // const { fetchMachines } = useFetchMachines();
  // useEffect(() => {
  //   fetchMachines();
  // }, [machineId]);

  const fetchMachine = async () => {
    setLoading(true);
    const data = await getMachineByID(machineId);
    setMachine(data);
    setLoading(false);
  };

  const handleBorrow = async () => {
    setLoading(true);
    await borrowMachine(machineId);
    await fetchMachine();
    router.push("/machines");
  };

  const handleReturn = async () => {
    setLoading(true);
    await returnMachine(machineId);
    await fetchMachine();
    router.push("/machines");
  };

  useEffect(() => {
    fetchMachine();
  }, [machineId]);

  if (loading)
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Laddar maskin...</Text>
      </SafeAreaView>
    );

  if (!machine)
    return (
      <SafeAreaView style={styles.center}>
        <Text>Maskin hittades inte</Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        <View style={styles.card}>
          <Text style={styles.name}>{machine.name}</Text>
          <Text>Enhet: {machine?.unitId?.name}</Text>
          <Text>Arbetsplats: {machine?.workplace?.name || "Okänd"}</Text>
          <Text>Status: {machine?.isAvailable ? "Inne" : "Utlånad"}</Text>

          <View style={styles.buttonContainer}>
            {machine?.isAvailable ? (
              <TouchableOpacity
                style={[styles.button, styles.borrowButton]}
                onPress={handleBorrow}>
                <Text style={styles.buttonText}>Låna</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.button, styles.returnButton]}
                onPress={handleReturn}>
                <Text style={styles.buttonText}>Returnera</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 8,
  },
  name: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 8,
  },
  borrowButton: { backgroundColor: "#7fc97f" },
  returnButton: { backgroundColor: "#4ca64c" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
