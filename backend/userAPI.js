import { BASE_URL } from "./base_url";

export const getUsers = async () => {
  try {
    const res = await fetch(`${BASE_URL}/users`);
    if (!res.ok) {
      throw new Error(`HTTP Error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log("users data from getUsers() ", data);
    return data;
  } catch (error) {
    if (error instanceof Error)
      console.error("Error fetching users,", error.message);
    return null;
  }
};

//En användare

export const getUserByID = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(`Fel vid hämtning av användare: ${errorData.message}`);
      return null;
    }

    const user = await response.json();
    console.log("Hämtad användare:", user);
    return user;
  } catch (error) {
    console.error("Nätverksfel vid hämtning av användare:", error.message);
    return null;
  }
};
