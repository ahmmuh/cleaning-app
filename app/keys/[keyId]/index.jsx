import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  checkinKey,
  checkoutKey,
  getKeyByID,
  updateKey,
} from "../../../backend/keyAPI";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome } from "@expo/vector-icons";
import ToastManager, { Toast } from "toastify-react-native";
import useFetchUsers from "../../../hooks/useFetchUsers";

function KeyDetail() {
  const { keyId } = useLocalSearchParams();
  const [key, setKey] = useState(null);
  const keyStatusar = ["Inlämnad", "Utlånad"];

  const [selectedStatus, setSelectedStatus] = useState("");
  const { users, loading, error } = useFetchUsers();
  const [selectedUserId, setSelectedUserId] = useState("");

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
      setSelectedUserId(keyData.borrowedBy ? keyData.borrowedBy._id : "");
    } catch (err) {
      console.error("Kunde inte hämta key:", err);
    }
  };

  useEffect(() => {
    if (keyId) {
      fetchKey();
    }
  }, [keyId]);

  //functions
  const changeStatus = async () => {
    const selectedUser = users.find((u) => u._id === selectedUserId);
    try {
      if (selectedStatus === "Utlånad") {
        if (!selectedUserId) {
          Toast.error("Välj en användare att låna ut till.");
          return;
        }
        console.log(
          "Vid utlåning",
          selectedUser.userType,
          selectedUserId,
          keyId
        );
        // Utlåning
        await checkoutKey(selectedUser.userType, selectedUserId, keyId);

        Toast.success("Nyckeln har lånats ut.");
      } else if (selectedStatus === "Inlämnad") {
        if (key.status !== "Utlånad") {
          Toast.error("Nyckeln är inte utlånad, kan inte lämnas in.");
          return;
        }

        if (key.borrowedBy?._id !== selectedUserId) {
          Toast.error("Vald användare matchar inte nuvarande lånetagare.");
          return;
        }
        console.log(
          "Vid inlämning",
          key.borrowedBy.userType,
          key.borrowedBy._id,
          keyId
        );

        // Inlämning
        await checkinKey(key.borrowedBy.userType, key.borrowedBy._id, keyId);

        Toast.success("Nyckeln har lämnats in.");
      }

      router.push("/keys");
    } catch (err) {
      console.error("Fel vid statusändring:", err);
      Toast.error("Ett fel uppstod vid uppdatering.");
    }
  };

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

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Text>Loading</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Text>{error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ToastManager />
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

        {/* Dynamically display dates based on key status */}
        <Text style={styles.info}>
          {key.status === "Utlånad" && (
            <>
              <FontAwesome
                style={{ paddingRight: 5 }}
                name="calendar"
                color={"gray"}
                size={20}
              />
              Lånedatum: {new Date(key.borrowedAt).toDateString()}
            </>
          )}

          {key.status === "Inlämnad" && (
            <>
              <FontAwesome
                style={{ paddingRight: 5 }}
                name="calendar"
                color={"green"}
                size={20}
              />
              Inlämnad: {new Date(key.returnedAt).toDateString()}
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
              Skapad: {new Date(key.createdAt).toLocaleDateString()}
            </>
          )}
        </Text>

        <Text style={styles.info}>
          Status: {selectedStatus}
          <FontAwesome
            name="check"
            color={key.status === "Utlånad" ? "red" : "green"}
          />
        </Text>

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Välj Lånetagare:</Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedUserId}
            onValueChange={(value) => setSelectedUserId(value)}>
            {users.map((user) => (
              <Picker.Item key={user._id} label={user.name} value={user._id} />
            ))}
          </Picker>
        </View>
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
            <Text style={styles.buttonTitle}>{getButtonLabel(key.status)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const getButtonLabel = (status) => {
  if (status === "Utlånad") return "Lämna in";
  if (status === "Inlämnad" || status === "available") return "Låna ut";
  return "Uppdatera";
};

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

  warningText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
    fontStyle: "italic",
  },
});

export default KeyDetail;
