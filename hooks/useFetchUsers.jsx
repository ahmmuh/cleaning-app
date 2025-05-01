import React, { useEffect, useState } from "react";
import { getApartments } from "../backend/apartmentAPI";
import { getUsers } from "../backend/userAPI";

function useFetchUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllUsers = async () => {
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
      setLoading(false);
    } catch (error) {
      console.error("Error vid hämtning av userList");
      setError(error);
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
