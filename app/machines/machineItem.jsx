
//NI kod:

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function MachineItem({ item }) {
  const router = useRouter();
  const { name, isAvailable } = item;

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <FontAwesome name="cog" size={24} color="#007AFF" />
        <Text style={styles.label}>{name}</Text>
        {/* Scan-ikon */}
        <TouchableOpacity
          style={{ marginLeft: "auto" }}
          onPress={() => router.push(`/machines/${item._id}/machineScan`)}>
          <FontAwesome name="camera" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <Text style={styles.detail}>Enhet: {item.unitId?.name || "Okänd"}</Text>
      <Text style={[styles.detail, { color: isAvailable ? "green" : "red" }]}>
        Status: {isAvailable ? "Inne" : "Utlånad"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    margin: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  label: { fontSize: 16, fontWeight: "bold", marginLeft: 8 },
  detail: { fontSize: 14, color: "#333", marginVertical: 2 },
});
