import React, { useEffect, useState } from "react";
import { getUnits } from "../backend/api";
import { getApartments } from "../backend/apartmentAPI";

function useFetchUnits() {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllUnits = async () => {
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
      setLoading(false);
    } catch (error) {
      console.error("Error vid hämtning av enheter");
      setError(error);
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
