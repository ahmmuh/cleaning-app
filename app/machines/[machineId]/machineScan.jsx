// import { CameraView, useCameraPermissions } from "expo-camera";
// import { useState } from "react";
// import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
// import { useRouter } from "expo-router";

// export default function MachineScanScreen() {
//   const [permission, requestPermission] = useCameraPermissions();
//   const [scanned, setScanned] = useState(false);
//   const router = useRouter();

//   const handleBarcodeScanned = ({ type, data }) => {
//     setScanned(true);
//     router.push(`/machines/${data}`);
//   };

//   if (!permission)
//     return (
//       <View style={styles.center}>
//         <Text>Laddar kameratillstånd...</Text>
//       </View>
//     );

//   if (!permission.granted)
//     return (
//       <View style={styles.center}>
//         <Text>Ingen kameratillgång</Text>
//         <Button title="Ge tillgång" onPress={requestPermission} />
//       </View>
//     );

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <CameraView
//         style={{ flex: 1 }}
//         onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
//         barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
//       />
//       {scanned && (
//         <Button title="Scanna igen" onPress={() => setScanned(false)} />
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   center: { flex: 1, justifyContent: "center", alignItems: "center" },
// });

import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { View, Text, Button, SafeAreaView, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function MachineScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const router = useRouter();
  const { machineId } = useLocalSearchParams(); // valfritt

  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    // Navigera till detaljsidan med scannad maskinId
    // router.push(`/machines/${data}`);

    //NY kod
    router.replace(`/machines/${data}`);
  };

  if (!permission)
    return (
      <View style={styles.center}>
        <Text>Laddar kameratillstånd...</Text>
      </View>
    );

  if (!permission.granted)
    return (
      <View style={styles.center}>
        <Text>Ingen kameratillgång</Text>
        <Button title="Ge tillgång" onPress={requestPermission} />
      </View>
    );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      />
      {scanned && (
        <Button title="Scanna igen" onPress={() => setScanned(false)} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
