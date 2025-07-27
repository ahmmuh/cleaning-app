import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { getAllTasks } from "../backend/taskAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

function useFetchTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  //Lägg liknande till alla för att uppdatera listor hela tiden
  useFocusEffect(
    useCallback(() => {
      fetchAllTasks();
    }, [])
  );

  const fetchAllTasks = async () => {
    setLoading(true);
    const tokenData = await AsyncStorage.getItem("userToken");
    const token = tokenData ? JSON.parse(tokenData)?.token : null;
    try {
      const taskList = await getAllTasks();

      if (!Array.isArray(taskList)) {
        throw new Error("Felaktig data, taskList är inte en array");
      }
      if (taskList?.length === 0) {
        console.log("Det finns inga taskList att visa");
      }
      setTasks(taskList);
    } catch (error) {
      if (error.message === "Unauthorized") {
        router.replace("/auth");
      }
      console.error("Error vid hämtning av todo lista");
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    fetchAllTasks,
  };
}

export default useFetchTasks;
