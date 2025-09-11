import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log("Kodtyp:", type);
    console.log("Nycke information (ID):", data);

    // Skicka vidare t.ex. till KeyDetail
    router.push(`/keys/${data}`);
  };

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text>Laddar kameratillstånd...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Ingen kameratillgång</Text>
        <Button title="Ge tillgång" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <CameraView
          style={{ flex: 1 }}
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"], // Endast QR-koder
          }}
        />
        {scanned && (
          <Button title="Scanna igen" onPress={() => setScanned(false)} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
