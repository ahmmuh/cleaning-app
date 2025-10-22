import { useState, useEffect, useCallback } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clockIn, clockOut, getUserClocks } from "../backend/clocksAPI";

function useFetchClocks(lastFour) {
  const [clocks, setClocks] = useState([]);
  const [allUserClocks, setAllUserClocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Hämta stämplingar för aktuell användare
  const fetchUserClocks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUserClocks(lastFour);

      if (!data) {
        throw new Error("Fel vid hämtning av användarens stämplingar");
      }
      if (!Array.isArray(data)) {
        console.warn("Servern returnerade icke-array för user clocks:", data);
        setClocks([]);
        return;
      }

      setClocks(data);
    } catch (err) {
      console.error("Error fetching user clocks:", err.message);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [lastFour]);

  // Stämpla in
  const handleClockIn = async () => {
    try {
      const data = await clockIn(lastFour);
      console.log("Clock In:", data);
      fetchUserClocks(); // uppdatera listan efter in-stämpling
      return data;
    } catch (err) {
      console.error("Clock In Error:", err.message);
      setError(err);
    }
  };

  // Stämpla ut
  const handleClockOut = async () => {
    try {
      const data = await clockOut(lastFour);
      console.log("Clock Out:", data);
      fetchUserClocks(); // uppdatera listan efter ut-stämpling
      return data;
    } catch (err) {
      console.error("Clock Out Error:", err.message);
      setError(err);
    }
  };

  // Automatisk uppdatering när skärmen fokuseras
  useFocusEffect(
    useCallback(() => {
      fetchUserClocks();
    }, [fetchUserClocks])
  );

  useEffect(() => {
    fetchUserClocks();
  }, [fetchUserClocks]);

  return {
    clocks,
    loading,
    error,
    handleClockIn,
    handleClockOut,
    fetchUserClocks,
  };
}

export default useFetchClocks;
