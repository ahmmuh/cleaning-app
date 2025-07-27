import React, { useEffect, useState } from "react";
import { getUnits } from "../backend/api";
import { getApartments } from "../backend/apartmentAPI";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

function useFetchUnits() {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const getAllUnits = async () => {
    setLoading(true);
    const tokenData = await AsyncStorage.getItem("userToken");
    const token = tokenData ? JSON.parse(tokenData)?.token : null;
    try {
      const unitList = await getUnits();

      if (!Array.isArray(unitList)) {
        throw new Error("Felaktig data, unitList är inte en array");
      }
      if (unitList?.length === 0) {
        console.log("Det finns inga enheter att visa");
        return;
      }
      setUnits(unitList);
    } catch (error) {
      if (error.message === "Unauthorized") {
        router.replace("/auth");
      }
      console.error("Error vid hämtning av enheter");
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUnits();
  }, []);

  return {
    units,
    loading,
    error,
  };
}

export default useFetchUnits;
