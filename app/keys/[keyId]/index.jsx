// // KeyDetail.js
// import React, { useState, useEffect } from "react";
// import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import { FontAwesome } from "@expo/vector-icons";
// import useFetchUser from "../../../hooks/useFetchCurrentUser";
// import { checkinKey, checkoutKey } from "../../../backend/keyAPI";

// const keyStatusar = [
//   { label: "Tillgänglig", value: "available" },
//   { label: "Utlånad", value: "checked-out" },
//   { label: "Inlämnad", value: "returned" },
// ];
// export default function KeyDetail({ keyData, onStatusChange }) {
//   const { user } = useFetchUser();
//   // const [selectedStatus, setSelectedStatus] = useState(keyData.status);
//   const [selectedStatus, setSelectedStatus] = useState(
//     keyData?.status || "available"
//   );

//   const [qrVisible, setQrVisible] = useState(false);

//   const keyStatusar = [
//     { label: "Tillgänglig", value: "available" },
//     { label: "Utlånad", value: "checked-out" },
//     { label: "Inlämnad", value: "returned" },
//   ];

//   // Uppdatera selectedStatus när keyData laddas
//   useEffect(() => {
//     if (keyData?.status) {
//       setSelectedStatus(keyData.status);
//     }
//   }, [keyData]);

//   const toggleQRCode = () => setQrVisible((prev) => !prev);

//   const changeStatus = async () => {
//     if (!user?._id) return alert("Ingen inloggad användare");

//     try {
//       if (selectedStatus === "checked-out")
//         await checkoutKey(user.role, user._id, keyData._id);
//       else if (selectedStatus === "returned")
//         await checkinKey(user.role, user._id, keyData._id);

//       onStatusChange?.();
//     } catch (error) {
//       console.error("Fel vid statusändring:", error);
//     }
//   };

//   const getButtonLabel = (status) => {
//     switch (status) {
//       case "available":
//         return "Låna nyckel";
//       case "checked-out":
//         return "Lämna tillbaka";
//       case "returned":
//         return "Nyckel inlämnad";
//       default:
//         return "Uppdatera";
//     }
//   };

//   if (!keyData) {
//     return (
//       <View style={styles.card}>
//         <Text>Laddar nyckel Ahmed </Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.card}>
//       <Text style={styles.title}>
//         <FontAwesome
//           name="key"
//           size={20}
//           color={keyData.status === "checked-out" ? "red" : "green"}
//         />{" "}
//         {keyData.keyLabel}
//       </Text>

//       {user?.name && (
//         <Text style={styles.info}>
//           <FontAwesome name="user" size={20} color="gray" /> {user.name}
//         </Text>
//       )}

//       {keyData.unit && (
//         <Text style={styles.info}>
//           <FontAwesome name="building" size={20} color="gray" />{" "}
//           {keyData.unit.name}
//         </Text>
//       )}

//       <Text style={styles.info}>
//         {keyData.status === "checked-out" &&
//           `Lånedatum: ${new Date(keyData.borrowedAt).toLocaleDateString(
//             "sv-SE"
//           )}`}
//         {keyData.status === "returned" &&
//           `Inlämnad: ${new Date(keyData.returnedAt).toLocaleDateString(
//             "sv-SE"
//           )}`}
//         {keyData.status === "available" &&
//           `Skapad: ${new Date(keyData.createdAt).toLocaleDateString("sv-SE")}`}
//       </Text>

//       <View style={styles.pickerContainer}>
//         <Text style={styles.pickerLabel}>Välj Status:</Text>
//         <Picker
//           style={styles.picker}
//           selectedValue={selectedStatus}
//           onValueChange={setSelectedStatus}>
//           {keyStatusar.map((s) => (
//             <Picker.Item key={s.value} label={s.label} value={s.value} />
//           ))}
//         </Picker>
//       </View>

//       <TouchableOpacity style={styles.updateButton} onPress={changeStatus}>
//         <Text style={styles.buttonTitle}>{getButtonLabel(selectedStatus)}</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.qrButton} onPress={toggleQRCode}>
//         <Text>{qrVisible ? "Dölj QR-kod" : "Visa QR-kod"}</Text>
//       </TouchableOpacity>

//       {qrVisible && keyData.qrCode && (
//         <Image source={{ uri: keyData.qrCode }} style={styles.qrImage} />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 12,
//     marginVertical: 8,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   title: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
//   info: { fontSize: 14, marginVertical: 2 },
//   pickerContainer: { marginTop: 12 },
//   pickerLabel: { fontSize: 14, fontWeight: "600" },
//   picker: { backgroundColor: "#f2f2f2", marginTop: 4 },
//   updateButton: {
//     backgroundColor: "#007AFF",
//     padding: 12,
//     borderRadius: 8,
//     marginTop: 12,
//     alignItems: "center",
//   },
//   buttonTitle: { color: "white", fontWeight: "bold" },
//   qrButton: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: "#E0E0E0",
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   qrImage: { width: 150, height: 150, marginTop: 12, alignSelf: "center" },
// });
// index.jsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getKeyByID } from "../../../backend/keyAPI";
import KeyDetail from "./keyDetailScreen";

export default function KeyDetailScreen() {
  const { keyId } = useLocalSearchParams();
  const [keyData, setKeyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchKey = async () => {
    setLoading(true);
    try {
      const data = await getKeyByID(keyId);
      if (!data) setError("Nyckel finns inte");
      else setKeyData(data);
    } catch (err) {
      console.error(err);
      setError("Fel vid hämtning av nyckel");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (keyId) fetchKey();
  }, [keyId]);

  if (loading)
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Laddar nyckel...</Text>
      </SafeAreaView>
    );

  if (error)
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        <KeyDetail keyData={keyData} onStatusChange={fetchKey} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: "red", fontSize: 16 },
});
