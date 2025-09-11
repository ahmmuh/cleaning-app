import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Touchable, TouchableHighlight } from "react-native";
import { Text, View, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useFetchUser from "../../hooks/useFetchCurrentUser";

function KeyItem({ item }) {
  const [status, setStatus] = useState(item?.status || "available");

  const router = useRouter();
  const statusIcon = getStatusIcon(item.status);
  const statusColor = getStatusColor(item.status);
  const { user } = useFetchUser();
  const showButton =
    status === "available" ||
    status === "returned" ||
    item?.borrowedBy?._id === user?._id;

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.row}>
          <Icon name={statusIcon} size={24} color={statusColor} />
          <Text style={[styles.nyckelTitle, { color: statusColor }]}>
            {item.keyLabel.toUpperCase()}
          </Text>
        </View>

        <Text style={styles.detail}>Enhet: {item.location}</Text>
        {normalizeStatus(item.status) === "checked-out" && item.borrowedBy && (
          <Text style={styles.detail}>Lånetagare: {item.borrowedBy.name}</Text>
        )}

        <Text style={[styles.status, { color: statusColor }]}>
          Status: {getStatusLabel(item.status)}
        </Text>

        {normalizeStatus(item.status) === "checked-out" && item.borrowedAt && (
          <Text style={styles.detail}>
            Senast ändrad: {new Date(item.updatedAt).toLocaleString("sv-SE")}
          </Text>
        )}

        {normalizeStatus(item.status) === "returned" && item.returnedAt && (
          <Text style={styles.detail}>
            Senast ändrad: {new Date(item.updatedAt).toLocaleString("sv-SE")}
          </Text>
        )}

        {normalizeStatus(item.status) === "available" && (
          <Text style={styles.detail}>
            Skapad: {new Date(item.createdAt).toLocaleString("sv-SE")}
          </Text>
        )}

        {showButton && (
          <TouchableHighlight
            style={{ marginVertical: 10 }}
            onPress={() => router.push(`/keys/${item._id}/keyQrScan`)}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ marginRight: 4 }}>Skanna</Text>
              <Icon name="camera" size={24} color="red" />
            </View>
          </TouchableHighlight>
        )}
      </View>
    </View>
  );
}

const normalizeStatus = (status) => {
  // Gör det enklare att hantera olika format
  const s = status.toLowerCase();
  if (s === "inlämnad" || s === "returned") return "returned";
  if (s === "utlånad" || s === "checked-out") return "checked-out";
  if (s === "tillgänglig" || s === "available") return "available";
  return s; // fallback
};

const getStatusLabel = (status) => {
  switch (normalizeStatus(status)) {
    case "available":
      return "Tillgänglig";
    case "checked-out":
      return "Utlånad";
    case "returned":
      return "Inlämnad";
    default:
      return status;
  }
};

const getStatusColor = (status) => {
  switch (normalizeStatus(status)) {
    case "returned":
    case "available":
      return "green";
    case "checked-out":
      return "red";
    default:
      return "gray";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "available":
      return "key";
    case "checked-out":
      return "key-remove";
    case "returned":
      return "key";
    default:
      return "key";
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  nyckelTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  detail: {
    fontSize: 14,
    marginVertical: 2,
    color: "#333",
  },
  status: {
    marginTop: 8,
    fontWeight: "600",
    fontSize: 14,
  },
});

export default KeyItem;
