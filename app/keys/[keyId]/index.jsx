import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { checkinKey, checkoutKey, getKeyByID } from "../../../backend/keyAPI";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome } from "@expo/vector-icons";
import ToastManager, { Toast } from "toastify-react-native";
import useFetchUsers from "../../../hooks/useFetchUsers";
import { displayError, displaySuccess } from "../../../utils/toastService";
import QRCodePage from "../../../myStorage/qrCode";

function KeyDetail() {
  const { keyId } = useLocalSearchParams();
  const [key, setKey] = useState(null);

  const keyStatusar = [
    { label: "Inlämnad", value: "returned" },
    { label: "Utlånad", value: "checked-out" },
    { label: "Tillgänglig", value: "available" },
  ];

  const [selectedStatus, setSelectedStatus] = useState("");
  const { users, loading, error } = useFetchUsers();
  const [selectedUserId, setSelectedUserId] = useState("");

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
      displayError("Vi kunde inte hämta nyckeln");
    }
  };

  useEffect(() => {
    if (keyId) {
      fetchKey();
    }
  }, [keyId]);

  // const isActionsValid = () => {
  //   const isCheckingOut =
  //     selectedStatus === "checked-out" && key.status === "returned";

  //   const isCheckingIn =
  //     selectedStatus === "returned" &&
  //     key.status === "checked-out" &&
  //     key.borrowedBy?._id === selectedUserId;

  //   return isCheckingOut || isCheckingIn;
  // };

  // const changeStatus = async () => {
  //   const selectedUser = users.find((u) => u._id === selectedUserId);
  //   try {
  //     if (selectedStatus === "checked-out") {
  //       if (!selectedUserId) {
  //         Toast.error("Välj en användare att låna ut till.");
  //         return;
  //       }
  //       await checkoutKey(selectedUser.userType, selectedUserId, keyId);
  //       Toast.success("Nyckeln har lånats ut.");
  //     } else if (
  //       selectedStatus === "returned" ||
  //       selectedStatus === "available"
  //     ) {
  //       if (key.status !== "checked-out") {
  //         Toast.error("Nyckeln är inte utlånad, kan inte lämnas in.");
  //         return;
  //       }

  //       if (key.borrowedBy?._id !== selectedUserId) {
  //         Toast.error("Vald användare matchar inte nuvarande lånetagare.");
  //         return;
  //       }
  //       await checkinKey(key.borrowedBy.userType, key.borrowedBy._id, keyId);
  //       Toast.success("Nyckeln har lämnats in.");
  //     }

  //     router.push("/keys");
  //   } catch (err) {
  //     console.error("Fel vid statusändring:", err);
  //     Toast.error("Ett fel uppstod vid uppdatering.");
  //   }
  // };
  const isActionsValid = () => {
    const isCheckingOut =
      selectedStatus === "checked-out" &&
      (key.status === "returned" || key.status === "available");

    const isCheckingIn =
      selectedStatus === "returned" &&
      key.status === "checked-out" &&
      key.borrowedBy?._id === selectedUserId;

    return isCheckingOut || isCheckingIn;
  };

  const changeStatus = async () => {
    const selectedUser = users.find((u) => u._id === selectedUserId);

    try {
      if (selectedStatus === "checked-out") {
        if (!selectedUserId) {
          Toast.error("Välj en användare att låna ut till.");
          return;
        }

        if (key.status !== "returned" && key.status !== "available") {
          Toast.error(
            "Nyckeln kan bara lånas ut om den är tillgänglig eller inlämnad."
          );
          return;
        }

        await checkoutKey(selectedUser.userType, selectedUserId, keyId);
        displaySuccess("Nyckeln har lånats ut.");
      } else if (selectedStatus === "returned") {
        if (key.status !== "checked-out") {
          displayError("Nyckeln är inte utlånad, kan inte lämnas in.");
          return;
        }

        if (key.borrowedBy?._id !== selectedUserId) {
          displayError("Vald användare matchar inte nuvarande lånetagare.");
          return;
        }

        await checkinKey(key.borrowedBy.userType, key.borrowedBy._id, keyId);
        displaySuccess("Nyckeln har lämnats in.");
      }

      router.push("/keys");
    } catch (err) {
      console.error("Fel vid statusändring:", err);
      displayError("Ett fel uppstod vid uppdatering.");
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
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
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
            color={key.status === "checked-out" ? "red" : "green"}
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
        <Text style={styles.info}>
          {key.status === "checked-out" && (
            <>
              <FontAwesome name="calendar" color="gray" size={20} /> Lånedatum:{" "}
              {new Date(key.borrowedAt).toDateString()}
            </>
          )}
          {key.status === "returned" && (
            <>
              <FontAwesome name="calendar" color="green" size={20} /> Inlämnad:{" "}
              {new Date(key.returnedAt).toDateString()}
            </>
          )}
          {key.status === "available" && (
            <>
              <FontAwesome name="calendar" color="green" size={20} /> Skapad:{" "}
              {new Date(key.createdAt).toLocaleDateString()}
            </>
          )}
        </Text>
        <Text style={styles.info}>
          Status: {selectedStatus}
          <FontAwesome
            name="check"
            color={key.status === "checked-out" ? "red" : "green"}
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
            onValueChange={(value) => setSelectedStatus(value)}>
            {keyStatusar.map((status) => (
              <Picker.Item
                key={status.value}
                label={status.label}
                value={status.value}
              />
            ))}
          </Picker>

          <TouchableOpacity
            style={[
              styles.updateButton,
              !isActionsValid() && { backgroundColor: "#ccc" },
            ]}
            onPress={changeStatus}
            disabled={!isActionsValid()}>
            <Text style={styles.buttonTitle}>{getButtonLabel(key.status)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const getButtonLabel = (status) => {
  if (status === "checked-out") return "Lämna in";
  if (status === "returned" || status === "available") return "Låna ut";
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
