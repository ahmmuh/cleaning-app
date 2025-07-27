import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";
import ToastManager, { Toast } from "toastify-react-native";
import {
  getApartmentByID,
  updateApartment,
} from "../../../../../../backend/apartmentAPI";
import useFetchApartment from "../../../../../../hooks/useFetchApartment";

export default function ApartmentDetail() {
  const { apartmentId } = useLocalSearchParams();
  console.log("apartmentId", apartmentId);
  const router = useRouter();
  const [apartment, setApartment] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const statusar = ["Ej påbörjat", "Påbörjat", "Färdigt"];

  const { fetchAllApartments } = useFetchApartment();

  const fetchApartment = async () => {
    try {
      const data = await getApartmentByID(apartmentId);
      console.log("APARTMENT DATA VIA APARTMENTID", data);
      setApartment(data);
      setSelectedStatus(data.status);
    } catch (err) {
      console.error("Kunde inte hämta apartment:", err);
      displayError("Det gick inte att hämta lägenheten");
    }
  };

  const changeStatus = async () => {
    const updated = await updateApartment(apartmentId, {
      status: selectedStatus,
    });

    if (updated) {
      setApartment(updated);
      fetchAllApartments();
      displaySuccess("Status har uppdaterats");
      router.push("/apartments");
    } else {
      displayError("Kunde inte uppdatera status");
    }
  };

  useEffect(() => {
    fetchApartment();
  }, [apartmentId]);

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
  };

  if (!apartment) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Laddar lägenhet {apartmentId}...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 40 }}>
      <KeyboardAvoidingView>
        <ScrollView style={styles.container}>
          <ToastManager />
          <View style={styles.header}>
            <Text style={styles.title}>{apartment.apartmentLocation}</Text>
            <Text style={[styles.status, getStatusStyle(selectedStatus)]}>
              <Icon name="info-circle" size={16} /> {selectedStatus}
            </Text>
          </View>

          <Text style={styles.description}>{apartment.description}</Text>

          <View style={styles.detailContainer}>
            <Text style={styles.detail}>
              <Icon name="exclamation-circle" size={14} color="#d97706" />{" "}
              <Text style={styles.priority}>{apartment.priority}</Text>
            </Text>

            <Text style={styles.date}>
              <Icon name="calendar" size={13} /> Start:{" "}
              {new Date(apartment.startDate).toLocaleDateString("sv-SE")}
            </Text>
            <Text style={styles.date}>
              <Icon name="calendar-check-o" size={13} /> Slut:{" "}
              {new Date(apartment.endDate).toLocaleDateString("sv-SE")}
            </Text>

            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Välj Status:</Text>
              <Picker
                selectedValue={selectedStatus}
                onValueChange={handleStatusChange}
                style={styles.picker}>
                {statusar.map((status) => (
                  <Picker.Item key={status} label={status} value={status} />
                ))}
              </Picker>
            </View>

            <TouchableOpacity
              style={styles.updateButton}
              onPress={changeStatus}>
              <Text style={styles.buttonTitle}>Byt status</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const getStatusStyle = (status) => {
  switch (status) {
    case "Färdigt":
      return { color: "green" };
    case "Ej påbörjat":
      return { color: "red" };
    case "Påbörjat":
      return { color: "orange" };
    default:
      return { color: "gray" };
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4f4f4",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
    color: "#444",
    marginBottom: 20,
    lineHeight: 22,
  },
  detailContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 15,
  },
  detail: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  priority: {
    fontWeight: "bold",
    color: "#d97706",
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  pickerContainer: {
    marginTop: 20,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
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
