import AsyncStorage from "@react-native-async-storage/async-storage";

const FetchWithAuth = async (url, options = {}) => {
  const token = await AsyncStorage.getItem("userToken");

  const mergedOptions = {
    ...options,
    credentials: "include",
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };

  try {
    const res = await fetch(url, mergedOptions);

    if (res.status === 401) {
      await AsyncStorage.removeItem("userToken");
      throw new Error("Unauthorized");
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
};

export default FetchWithAuth;
