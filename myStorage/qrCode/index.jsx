import React, { useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { getKeyByQRCode, getUserByQRCode } from "../../backend/keyAPI"; // API-funktioner
import { Toast } from "toastify-react-native";

export default function QRCodeScan() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState(null);
  const [user, setUser] = useState(null);
  const [key, setKey] = useState(null);
  const router = useRouter(); // För navigering till KeyDetail

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Appen behöver din tillåtelse för att få åtkomst till kameran
        </Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.text}>Skanna</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleQRCodeScan = async (qrCodeData) => {
    setScannedData(qrCodeData);

    // Hämta nyckel- och användardata när QR-koden är skannad
    try {
      const keyData = await getKeyByQRCode(qrCodeData.keyId);
      const userData = await getUserByQRCode(qrCodeData.userId);

      setKey(keyData);
      setUser(userData);

      // Navigera till KeyDetail med keyId
      router.push(`/keyDetail?keyId=${keyData._id}`);
    } catch (error) {
      console.error("Error fetching data:", error);
      Toast.error("Kunde inte hämta nyckel- eller användardata.");
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        onBarCodeScanned={({ data }) => handleQRCodeScan(data)}>
        <View style={styles.overlay}>
          <Text style={styles.text}>
            {scannedData ? `Scanned: ${scannedData}` : "Skanna QR-kod"}
          </Text>
        </View>
      </CameraView>

      {user && key && (
        <View style={styles.infoContainer}>
          <Text>User: {user.name}</Text>
          <Text>Key: {key.keyLabel}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  overlay: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: 20,
  },
});
