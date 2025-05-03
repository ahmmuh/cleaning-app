import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";
import { getAllTasks } from "../backend/taskAPI";

function useFetchTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Lägg liknande till alla för att uppdatera listor hela tiden
  useFocusEffect(
    useCallback(() => {
      fetchAllTasks();
    }, [])
  );

  const fetchAllTasks = async () => {
    try {
      const taskList = await getAllTasks();

      if (!Array.isArray(taskList)) {
        throw new Error("Felaktig data, taskList är inte en array");
      }
      if (taskList?.length === 0) {
        console.log("Det finns inga taskList att visa");
      }
      setTasks(taskList);
      setLoading(false);
    } catch (error) {
      console.error("Error vid hämtning av taskList");
      setError(error);
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
