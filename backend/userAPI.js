// import { BASE_URL } from "./base_url";

// //En användare

// export const getUserByID = async (userId) => {
//   try {
//     const response = await fetch(`${BASE_URL}/users/${userId}`, {
//       method: "GET",
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.log(`Fel vid hämtning av användare: ${errorData.message}`);
//       return null;
//     }

//     const user = await response.json();
//     console.log("Hämtad användare:", user);
//     return user;
//   } catch (error) {
//     console.error("Nätverksfel vid hämtning av användare:", error.message);
//     return null;
//   }
// };

//Code från nextjs (USER API)

import FetchWithAuth from "../lib/fetchWithAuth";
import { BASE_URL } from "./base_url";

export const getUsers = async () => {
  try {
    const data = await FetchWithAuth(`${BASE_URL}/users`);
    console.log("users data from getUsers() ", data);
    return data;
  } catch (error) {
    if (error instanceof Error)
      console.error("Error fetching users,", error.message);
    return null;
  }
};
export const getUserById = async (userId) => {
  try {
    const data = await FetchWithAuth(`${BASE_URL}/users/${userId}`);
    // console.log("Hämtat USER data i getUserById: ", data);
    return data;
  } catch (error) {
    if (error.message.includes("401")) return "unauthorized";
    if (error instanceof Error) {
      console.error("Server Error:", error.message);
    }
    return null;
  }
};

// Delete user:
export const deleteUser = async (userId) => {
  try {
    const data = await FetchWithAuth(`${BASE_URL}/users/${userId}`, {
      method: "DELETE",
    });
    return data;
  } catch (error) {
    console.error("Error deleting chef:", error.message);
    return error;
  }
};

//Skika notis till backend

// export const saveExpoPushToken = async (expoPushToken) => {
//   try {
//     const res = await FetchWithAuth(`${BASE_URL}/users/save-token`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         expoPushToken,
//       }),
//     });

//     const result = await res.json();
//     return result;
//   } catch (error) {
//     console.error("Fel vid skickande av push-notis:", error);
//     return { success: false, message: "Kunde inte skicka push-notis" };
//   }
// };

export const saveExpoPushToken = async (expoPushToken) => {
  try {
    const result = await FetchWithAuth(`${BASE_URL}/users/save-token`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expoPushToken),
    });

    return result; // redan JSON
  } catch (error) {
    console.error("Fel vid skickande av push-notis:", error);
    return { success: false, message: "Kunde inte skicka push-notis" };
  }
};

// Sök användare
export const searchUsers = async (query) => {
  if (!query.trim()) return [];
  try {
    const data = await FetchWithAuth(`${BASE_URL}/users/search?name=${query}`);
    return data.data || [];
  } catch (error) {
    if (error.message.includes("401")) return "unauthorized";
    if (error.message.includes("404")) return [];
    if (error instanceof Error) {
      console.error("Server Error:", error.message);
    }
    return [];
  }
};
