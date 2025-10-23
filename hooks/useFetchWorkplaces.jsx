import { useState, useEffect } from "react";
import { getWorkplaces } from "../backend/workPlaceAPI";

export default function useFetchWorkplaces() {
  const [workplaces, setWorkplaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllWorkplaces = async () => {
    setLoading(true);
    try {
      const data = await getWorkplaces();
      if (!Array.isArray(data)) {
        throw new Error("Felaktig data: workplaces är inte en array");
      }
      setWorkplaces(data);
    } catch (err) {
      console.error("Error fetching workplaces:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllWorkplaces();
  }, []);

  return { workplaces, loading, error };
}
