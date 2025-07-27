// import AsyncStorage from "@react-native-async-storage/async-storage";

// const FetchWithAuth = async (url, options = {}) => {
//   const token = await AsyncStorage.getItem("userToken");

//   const mergedOptions = {
//     ...options,
//     credentials: "include",
//     headers: {
//       ...options.headers,
//       "Content-Type": "application/json",
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     },
//   };

//   try {
//     const res = await fetch(url, mergedOptions);

//     if (res.status === 401) {
//       await AsyncStorage.removeItem("userToken");
//       throw new Error("Unauthorized");
//     }

//     return await res.json();
//   } catch (error) {
//     console.error("Fetch error:", error.message);
//     throw error;
//   }
// };

// export default FetchWithAuth;

// import AsyncStorage from "@react-native-async-storage/async-storage";

// const FetchWithAuth = async (url, options = {}) => {
//   const raw = await AsyncStorage.getItem("userToken");
//   const parsed = raw ? JSON.parse(raw) : null;
//   const token = parsed?.token;
//   console.log("Sending Authorization header:", token);

//   const mergedOptions = {
//     ...options,
//     credentials: "include",
//     headers: {
//       ...options.headers,
//       "Content-Type": "application/json",
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     },
//   };

//   try {
//     const res = await fetch(url, mergedOptions);

//     if (res.status === 401) {
//       await AsyncStorage.removeItem("userToken");
//       throw new Error("Unauthorized");
//     }

//     return await res.json();
//   } catch (error) {
//     console.error("Fetch error:", error.message);
//     throw error;
//   }
// };

// export default FetchWithAuth;

const FetchWithAuth = async (url, options = {}) => {
  const mergedOptions = {
    ...options,
    credentials: "include", // viktigt för cookies
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await fetch(url, mergedOptions);

    if (res.status === 401) {
      // Token är ogiltig eller utloggad på servern
      // Rensa lokala token om du sparar någon, eller logga ut användare
      throw new Error("Unauthorized");
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
};
export default FetchWithAuth;
