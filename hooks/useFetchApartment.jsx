import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { getApartments } from "../backend/apartmentAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

function useFetchApartment() {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      fetchAllApartments();
    }, [])
  );

  const fetchAllApartments = async () => {
    const tokenData = await AsyncStorage.getItem("userToken");
    const token = tokenData ? JSON.parse(tokenData)?.token : null;
    try {
      const apartmentList = await getApartments();

      if (!Array.isArray(apartmentList)) {
        throw new Error("Felaktig data, apartmentList är inte en array");
      }
      if (apartmentList?.length === 0) {
        console.log("Det finns inga apartmentList att visa");
        return;
      }
      setApartments(apartmentList);
    } catch (error) {
      if (error.message === "Unauthorized") {
        router.replace("/auth");
      } else {
        console.error("Fel vid hämtning av apartmentList:", error);
      }
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllApartments();
  }, []);

  return {
    apartments,
    loading,
    error,
    fetchAllApartments,
  };
}

export default useFetchApartment;
