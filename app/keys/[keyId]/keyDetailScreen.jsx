//Nyare kod 11/09/2025

import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import useFetchUser from "../../../hooks/useFetchCurrentUser";
import { checkinKey, checkoutKey } from "../../../backend/keyAPI";

export default function KeyDetail({ keyData, onStatusChange }) {
  const { user } = useFetchUser();
  const [status, setStatus] = useState(keyData?.status || "available");
  const [borrowedAt, setBorrowedAt] = useState(keyData?.borrowedAt || null);
  const [returnedAt, setReturnedAt] = useState(keyData?.returnedAt || null);
  const [loading, setLoading] = useState(false);

  const showButton =
    status === "available" ||
    status === "returned" ||
    keyData?.borrowedBy?._id === user?._id;

  useEffect(() => {
    if (keyData) {
      setStatus(keyData.status);
      setBorrowedAt(keyData.borrowedAt || null);
      setReturnedAt(keyData.returnedAt || null);
    }
  }, [keyData]);

  const handleAction = async () => {
    if (!user?._id) return alert("Ingen inloggad användare");
    setLoading(true);
    try {
      if (status === "available" || status === "returned") {
        // Låna nyckel
        const updatedKey = await checkoutKey(user._id, keyData._id);
        setStatus("checked-out");
        setBorrowedAt(updatedKey.borrowedAt || new Date().toISOString());
        setReturnedAt(null);
      } else if (status === "checked-out") {
        // Lämna tillbaka nyckel
        const updatedKey = await checkinKey(user._id, keyData._id);
        setStatus("returned");
        setReturnedAt(updatedKey.returnedAt || new Date().toISOString());
      }
      onStatusChange?.();
    } catch (error) {
      console.error("Fel vid statusändring:", error);
      alert("Kunde inte uppdatera nyckeln, försök igen.");
    }
    setLoading(false);
  };

  const getButtonLabel = () => {
    return status === "available" || status === "returned"
      ? "Låna"
      : "Lämna in";
  };

  // if (!keyData) {
  //   return (
  //     <View style={styles.card}>
  //       <Text>Laddar nyckel...</Text>
  //     </View>
  //   );
  // }

  if (!keyData)
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Laddar nyckel...</Text>
      </SafeAreaView>
    );

  return (
    <View style={styles.card}>
      {/* Nyckelinfo */}
      <View style={styles.row}>
        <FontAwesome
          name="key"
          size={24}
          color={status === "checked-out" ? "red" : "green"}
          style={{ marginRight: 8 }}
        />
        <Text style={styles.keyLabel}>{keyData.keyLabel}</Text>
      </View>

      {/* Användare */}
      {keyData?.borrowedBy?.name && (
        <View style={styles.row}>
          <FontAwesome
            name="user"
            size={20}
            color="gray"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.userName}>{keyData?.borrowedBy?.name}</Text>
        </View>
      )}

      {/* Enhet */}
      {keyData.unit && (
        <View style={styles.row}>
          <FontAwesome
            name="building"
            size={20}
            color="gray"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.infoText}>{keyData.unit.name}</Text>
        </View>
      )}

      {/* Datum */}
      <View style={styles.row}>
        <FontAwesome
          name="calendar"
          size={20}
          color="gray"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.infoText}>
          {status === "checked-out" &&
            `Lånedatum: ${new Date(borrowedAt).toLocaleDateString("sv-SE")}`}
          {status === "returned" &&
            `Inlämnad: ${new Date(returnedAt).toLocaleDateString("sv-SE")}`}
          {status === "available" &&
            `Skapad: ${new Date(keyData.createdAt).toLocaleDateString(
              "sv-SE"
            )}`}
        </Text>
      </View>

      {/* Knapp */}
      {showButton && (
        <TouchableOpacity
          style={[styles.updateButton, loading && styles.disabledButton]}
          onPress={handleAction}
          disabled={loading}>
          <Text style={styles.buttonTitle}>
            {loading ? "Vänta..." : getButtonLabel()}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  keyLabel: {
    fontSize: 22,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
  },
  infoText: {
    fontSize: 16,
    color: "#333",
  },
  updateButton: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#a0cfff",
  },
  buttonTitle: { color: "white", fontWeight: "bold", fontSize: 16 },
});
