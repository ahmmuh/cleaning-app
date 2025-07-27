import React, { useEffect, useState } from "react";
import { getAllKeys } from "../backend/keyAPI";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

function useFetchKeys() {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchAllKeys = async () => {
    const tokenData = await AsyncStorage.getItem("userToken");
    const token = tokenData ? JSON.parse(tokenData)?.token : null;
    try {
      const keyList = await getAllKeys();

      if (!Array.isArray(keyList)) {
        throw new Error("Felaktig data, keyList är inte en array");
      }
      if (keyList?.length === 0) {
        console.log("Det finns inga keys att visa");
        return;
      }
      setKeys(keyList);
    } catch (error) {
      if (error.message === "Unauthorized") {
        router.replace("/auth");
      } else {
        console.error("Fel vid hämtning av nycklar:", error);
      }
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllKeys();
  }, []);

  return {
    keys,
    loading,
    error,
  };
}

export default useFetchKeys;
