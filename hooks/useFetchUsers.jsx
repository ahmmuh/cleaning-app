import React, { useEffect, useState } from "react";
import { getApartments } from "../backend/apartmentAPI";
import { getUsers } from "../backend/userAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

function useFetchUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchAllUsers = async () => {
    const tokenData = await AsyncStorage.getItem("userToken");
    const token = tokenData ? JSON.parse(tokenData)?.token : null;
    try {
      const userList = await getUsers();

      if (!Array.isArray(userList)) {
        throw new Error("Felaktig data, userList är inte en array");
      }
      if (userList?.length === 0) {
        console.log("Det finns inga userList att visa");
        return;
      }
      setUsers(userList);
    } catch (error) {
      if (error.message === "Unauthorized") {
        router.replace("/auth");
      }
      console.error("Error vid hämtning av userList");
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return {
    users,
    loading,
    error,
  };
}

export default useFetchUsers;
