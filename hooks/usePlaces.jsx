import React, { useState } from "react";
import { getPlaces } from "../backend/googlePlaceApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

function usePlaces() {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchPlaces = async (searchedTex) => {
    const tokenData = await AsyncStorage.getItem("userToken");
    const token = tokenData ? JSON.parse(tokenData)?.token : null;
    try {
      const placesData = await getPlaces(searchedTex);
      const results = placesData?.results || [];
      console.log("Found places", results);
      setPlaces(results);
      setFilteredPlaces(results);
    } catch (error) {
      if (error.message === "Unauthorized") {
        router.replace("/auth");
      }
      console.error("Error vid sökning av platser", error.message);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    places,
    filteredPlaces,
    fetchPlaces,
    error,
  };
}

export default usePlaces;
