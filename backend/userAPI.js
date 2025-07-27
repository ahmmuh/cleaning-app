// import { BASE_URL } from "./base_url";

// export const getUsers = async () => {
//   try {
//     const res = await fetch(`${BASE_URL}/users`);
//     if (!res.ok) {
//       throw new Error(`HTTP Error! status: ${res.status}`);
//     }
//     const data = await res.json();
//     console.log("users data from getUsers() ", data);
//     return data;
//   } catch (error) {
//     if (error instanceof Error)
//       console.error("Error fetching users,", error.message);
//     return null;
//   }
// };

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

//COde från nextjs (USER API)

import FetchWithAuth from "../app/lib/fetchWithAuth";
import { BASE_URL } from "./base_url";

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

// import { BASE_URL } from "./base_url";

// export const getUserById = async (userId) => {
//   try {
//     const res = await fetch(`${BASE_URL}/users/${userId}`, {
//       method: "GET",
//       credentials: "include",
//     });

//     if (res.status === 401) {
//       return "unauthorized";
//     }

//     if (!res.ok) {
//       console.log(`Server error when fetching data, status: ${res.status}`);
//       return null;
//     }

//     const data = await res.json();
//     // console.log("Hämtat USER data i getUserById: ", data);

//     return data;
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("Server Error:", error.message);
//     }
//     return null;
//   }
// };

// //Sök användare

// export const searchUsers = async (query) => {
//   if (!query.trim()) return [];
//   const res = await fetch(`${BASE_URL}/users/search?name=${query}`, {
//     method: "GET",
//     credentials: "include",
//   });
//   if (res.status === 401) {
//     return "unauthorized";
//   }

//   if (!res.ok) {
//     if (res.status === 404) {
//       return [];
//     }
//     throw new Error(data.message);
//   }
//   const data = await res.json();

//   return data.data;
// };
