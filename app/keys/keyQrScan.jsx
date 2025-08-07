import { Camera } from "expo-camera";

import { useEffect, useState } from "react";

import { Button, StyleSheet, View, Text } from "react-native";

export default CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      console.log("CAMERA STATUS", status);
      setHasPermission(status === "granted");
    })();

    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      console.log("Kodtyp ", type);
      console.log("Innehåll ", data);
    };
  }, []);

  if (hasPermission === null) {
    return (
      <View style={{ flex: 1 }}>
        <Text>Begär kameratillstånd</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={{ flex: 1 }}>
        <Text>Ingen kameratillgång</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              b
      />
    </View>
  );
};
