import React, { useEffect, useState } from "react";
import { getAllKeys } from "../backend/keyAPI";

function useFetchKeys() {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllKeys = async () => {
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
      setLoading(false);
    } catch (error) {
      console.error("Error vid hämtning av keys");
      setError(error);
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
