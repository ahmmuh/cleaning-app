import React, { useState } from "react";
import { getPlaces } from "../backend/googlePlaceApi";

function UsePlaces() {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [error, setError] = useState(null);

  const fetchPlaces = async (searchedTex) => {
    try {
      const placesData = await getPlaces(searchedTex);
      const results = placesData?.results || [];
      console.log("Found places", results);
      setPlaces(results);
      setFilteredPlaces(results);
    } catch (error) {
      console.error("Error vid sökning av platser", error.message);
      setError(error);
    }
  };
  return {
    places,
    filteredPlaces,
    fetchPlaces,
    error,
  };
}

export default UsePlaces;
