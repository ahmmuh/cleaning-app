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

//     if (res.status === 401) {
//       // Token är ogiltig eller utloggad på servern
//       // Rensa lokala token om du sparar någon, eller logga ut användare
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

    if (!res.ok) {
      // Läs felmeddelande som text
      const text = await res.text();
      if (res.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error(text || `HTTP error: ${res.status}`);
      }
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
};

export default FetchWithAuth;
