import React, { useEffect, useState } from "react";
import { getApartments } from "../backend/apartmentAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { getCurrentUser } from "../backend/authApi";

function useFetchUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchCurrentUser = async () => {
    setLoading(true);
    const tokenData = await AsyncStorage.getItem("userToken");
    const token = tokenData ? JSON.parse(tokenData)?.token : null;
    try {
      const currentUser = await getCurrentUser();

      if (!currentUser || currentUser === null || currentUser === undefined) {
        throw new Error("Det finns ingen inloggade användare");
      }

      setUser(currentUser);
    } catch (error) {
      if (error.message === "Unauthorized") {
        router.replace("/auth");
      }
      console.error("Error vid hämtning av inloggade användare");
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return {
    user,
    loading,
    error,
  };
}

export default useFetchUser;
