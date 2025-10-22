import { useState, useEffect, useCallback } from "react";
import { getAllMachines } from "../backend/machineAPI";

function useFetchMachines() {
  const [machines, setMachines] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Hämta alla maskiner
  const fetchMachines = useCallback(async () => {
    setLoading(true);

    try {
      const data = await getAllMachines(); // kan kasta Error("Unauthorized")

      if (!Array.isArray(data)) {
        throw new Error("Felaktig data, data är inte en array");
      }
      if (data?.length === 0) {
        console.log("Det finns inga maskiner att visa");
        return;
      }
      setMachines(Array.isArray(data) ? data : []);
    } catch (error) {
      if (error.message === "Unauthorized") {
        setError("Du är inte inloggad eller har inte behörighet.");
      } else {
        setError(error.message || "Fel vid hämtning av maskiner");
      }
      console.log("Fel vid hämtning av maskiner:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Skapa maskin
  const addMachine = async (newMachine) => {
    setLoading(true);
    const data = await createMachine(newMachine);
    setLoading(false);
    if (data === "unauthorized") setError("Unauthorized");
    return data;
  };

  // Uppdatera maskin
  const editMachine = async (machineId, updatedMachine) => {
    setLoading(true);
    const data = await updateMachine(machineId, updatedMachine);
    setLoading(false);
    if (data === "unauthorized") setError("Unauthorized");
    else fetchMachines();
    return data;
  };

  // Ta bort maskin
  const removeMachine = async (machineId) => {
    setLoading(true);
    const data = await deleteMachine(machineId);
    setLoading(false);
    if (data === "unauthorized") setError("Unauthorized");
    else fetchMachines();
    return data;
  };

  // Låna maskin
  const borrow = async (machineId, userId) => {
    setLoading(true);
    const data = await borrowMachine(machineId, userId);
    setLoading(false);
    if (data === "unauthorized") setError("Unauthorized");
    else fetchMachines();
    return data;
  };

  // Återlämna maskin
  const returnM = async (machineId) => {
    setLoading(true);
    const data = await returnMachine(machineId);
    setLoading(false);
    if (data === "unauthorized") setError("Unauthorized");
    else fetchMachines();
    return data;
  };

  // Sök maskiner
  const search = async (query) => {
    setLoading(true);
    const data = await searchMachines(query);
    setLoading(false);
    if (data === "unauthorized") setError("Unauthorized");
    else setMachines(data || []);
    return data;
  };

  useEffect(() => {
    fetchMachines();
  }, [fetchMachines]);

  return {
    machines,
    logs,
    loading,
    error,
    fetchMachines,
    addMachine,
    editMachine,
    removeMachine,
    borrow,
    returnM,
    search,
  };
}

export default useFetchMachines;
