import React, { useEffect, useState } from "react";
import { getAllApartments } from "../backend/apartmentAPI";

function useFetchApartment() {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllApartments = async () => {
    try {
      const apartmentList = await getAllApartments();

      if (!Array.isArray(apartmentList)) {
        throw new Error("Felaktig data, apartmentList är inte en array");
      }
      if (apartmentList?.length === 0) {
        console.log("Det finns inga apartmentList att visa");
        return;
      }
      setApartments(apartmentList);
      setLoading(false);
    } catch (error) {
      console.error("Error vid hämtning av apartmentList");
      setError(error);
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
  };
}

export default useFetchApartment;
