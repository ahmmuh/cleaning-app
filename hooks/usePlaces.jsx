// usePlaces.js
import React, { useState } from "react";
import { getPlaces } from "../backend/openStreetMapPlaceApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

function useFetchPlaces() {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchPlaceData = async (searchedText) => {
    setLoading(true);
    try {
      const tokenData = await AsyncStorage.getItem("userToken");
      const token = tokenData ? JSON.parse(tokenData)?.token : null;

      const placesData = await getPlaces(searchedText, token);
      console.log("Found places:", placesData);

      // OSM returnerar en array direkt
      setPlaces(placesData);
      setFilteredPlaces(placesData);
    } catch (err) {
      if (err.message === "Unauthorized") {
        router.replace("/auth");
      }
      console.error("Error vid sökning av platser:", err.message);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    places,
    filteredPlaces,
    fetchPlaceData,
    error,
  };
}

export default useFetchPlaces;
