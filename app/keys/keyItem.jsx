import { useRouter } from "expo-router";
import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function KeyItem({ item }) {
  const router = useRouter();
  const statusIcon = getStatusIcon(item.status);
  const statusColor = getStatusColor(item.status);
  // console.log("Navigerar till:", `/keys/${item._id}`);
  // console.log("ReturnedAt:", item.returnedAt);

  // console.log("STATUS:", item.status);
  // console.log("COLOR:", getStatusColor(item.status));
  // console.log("LABEL:", getStatusLabel(item.status));

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push(`/keys/qrCode`)}>
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

        {normalizeStatus(item.status) === "checked-out" && item.borrowedAt && (
          <Text style={styles.detail}>
            Utlånat: {new Date(item.borrowedAt).toLocaleDateString("sv-SE")}
          </Text>
        )}

        {normalizeStatus(item.status) === "returned" && item.returnedAt && (
          <Text style={styles.detail}>
            Inlämnat: {new Date(item.returnedAt).toLocaleDateString("sv-SE")}
          </Text>
        )}

        <Text style={[styles.status, { color: statusColor }]}>
          Status: {getStatusLabel(item.status)}
        </Text>
      </Pressable>
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
