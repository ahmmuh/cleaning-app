// const FetchWithAuth = async (url, options = {}) => {
//   const mergedOptions = {
//     ...options,
//     credentials: "include", // viktigt för cookies
//     headers: {
//       ...options.headers,
//       "Content-Type": "application/json",
//     },
//   };

//   try {
//     const res = await fetch(url, mergedOptions);

//     if (!res.ok) {
//       // Läs felmeddelande som text
//       const text = await res.text();
//       if (res.status === 401) {
//         throw new Error("Unauthorized");
//       } else {
//         throw new Error(text || `HTTP error: ${res.status}`);
//       }
//     }

//     return await res.json();
//   } catch (error) {
//     console.error("Fetch error:", error.message);
//     throw error;
//   }
// };

// export default FetchWithAuth;

// KOD

// lib/fetchWithAuth.js

import axios from "axios";

const FetchWithAuth = async (url, options = {}) => {
  try {
    const res = await axios({
      url,
      method: options.method || "GET",
      data: options.body || undefined,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    if (error.response?.data) return error.response.data;
    return { message: "Okänt fel" };
  }
};

export default FetchWithAuth;
