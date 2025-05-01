import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getKeyByID, updateKey } from "../../../backend/keyAPI";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome } from "@expo/vector-icons";
import ToastManager, { Toast } from "toastify-react-native";

function KeyDetail() {
  const { keyId } = useLocalSearchParams();
  const [key, setKey] = useState(null);
  const keyStatusar = ["Inlämnad", "Utlånad"];

  const [selectedStatus, setSelectedStatus] = useState("");

  //Router

  const router = useRouter();
  const fetchKey = async () => {
    try {
      const keyData = await getKeyByID(keyId);

      if (!keyData) {
        console.log("Denna nyckel finns EJ");
        return;
      }
      setKey(keyData);
      setSelectedStatus(keyData.status || "");
    } catch (err) {
      console.error("Kunde inte hämta key:", err);
    }
  };

  useEffect(() => {
    if (keyId) {
      fetchKey();
    }
  }, [keyId]);

  if (!keyId) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Det finns ingen key ID</Text>
      </View>
    );
  }

  if (!key) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Laddar nyckeldetaljer...</Text>
      </View>
    );
  }
  //functions
  const changeStatus = async () => {
    // if (key.status === "checked-out") {
    //   alert("Den är redan utlånad");
    // }
    // if (key.status === "returned") {
    //   alert("Den är redan inlämnad");
    // }
    console.log(keyId, selectedStatus);
    setSelectedStatus(selectedStatus);
    await updateKey(keyId, { status: selectedStatus });
    Toast.success({ status: selectedStatus });
    router.push("/keys");
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          <FontAwesome
            name="key"
            color={key.status === "Utlånad" ? "red" : "green"}
            size={20}
          />{" "}
          {key.keyLabel}
        </Text>
        <Text style={styles.info}>
          <FontAwesome name="user" color={"gray"} size={20} />{" "}
          {key.borrowedBy ? key.borrowedBy.name : ""}
        </Text>
        <Text style={styles.info}>
          <FontAwesome name="building" size={20} color={"gray"} />:{" "}
          {key.location}
        </Text>
        <Text>
          {key.status === "checked-out" && (
            <>
              <FontAwesome
                style={{ paddingRight: 5 }}
                name="calendar"
                color={"gray"}
                size={20}
              />
              {key.borrowedAt
                ? new Date(key.borrowedAt).toLocaleDateString()
                : ""}
            </>
          )}

          {key.status === "returned" && (
            <>
              <FontAwesome
                style={{ paddingRight: 5 }}
                name="calendar"
                color={"green"}
                size={20}
              />
              {key.borrowedAt
                ? new Date(key.returnedAt).toLocaleDateString()
                : ""}
            </>
          )}

          {key.status === "available" && (
            <>
              <FontAwesome
                style={{ paddingRight: 5 }}
                name="calendar"
                color={"green"}
                size={20}
              />
              {key.borrowedAt
                ? new Date(key.createdAt).toLocaleDateString()
                : ""}
            </>
          )}
        </Text>

        <Text style={styles.info}>
          Status:{selectedStatus}
          <FontAwesome
            name="check"
            color={key.status === "Utlånad" ? "red" : "green"}
          />
        </Text>
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Välj Status:</Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedStatus}
            onValueChange={(itemValue) => setSelectedStatus(itemValue)}>
            {keyStatusar.map((status) => (
              <Picker.Item key={status} label={status} value={status} />
            ))}
          </Picker>
          <TouchableOpacity style={styles.updateButton} onPress={changeStatus}>
            <Text style={styles.buttonTitle}>Byt status</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  card: {
    justifyContent: "center",
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    backgroundColor: "#fff",
  },
  pickerContainer: {
    marginTop: 10,
  },
  picker: {
    width: "100%",
    backgroundColor: "#fff",
    height: 50,
    borderWidth: 1,
    borderColor: "#222",
    borderRadius: 8,
  },
  pickerLabel: {
    color: "#222",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    borderTopColor: "#000",
    borderTopWidth: 1,
    paddingTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: "#555",
    marginBottom: 6,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  loadingText: {
    fontSize: 16,
    color: "#888",
  },
  updateButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  buttonTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default KeyDetail;
