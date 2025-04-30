import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native";
import { getKeyByID } from "../../../backend/keyAPI";

function KeyDetail() {
  const { keyId } = useLocalSearchParams();
  console.log("KEY ID i Keydetail page", keyId);
  const [key, setKey] = useState(null);

  //Hämta key by ID
  const fetchKey = async () => {
    try {
      const keyData = await getKeyByID(keyId);
      console.log("KEY ID i getKeyByID", keyId);

      if (!keyData) {
        console.log("Denna nyckel finns EJ");
      }
      console.log(keyData);
      setKey(keyData);
    } catch (err) {
      console.error("Kunde inte hämta key:", err);
    }
  };
  if (!keyId) {
    return (
      <View style={{ flex: 1 }}>
        <Text>Det finns ingen key ID</Text>
      </View>
    );
  }
  useEffect(() => {
    fetchKey();
  }, [keyId]);
  return (
    <View style={{ flex: 1 }}>
      <Text>
        Key ID: {keyId} key:{key?.keyLabel}
      </Text>
    </View>
  );
}

export default KeyDetail;
