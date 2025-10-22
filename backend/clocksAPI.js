// import * as Location from "expo-location";
// import FetchWithAuth from "../lib/fetchWithAuth";
// import { BASE_URL } from "./base_url";

// // 📍 Hämta användarens position
// const getCurrentPosition = async () => {
//   const { status } = await Location.requestForegroundPermissionsAsync();
//   if (status !== "granted") throw new Error("Geolocation-behörighet nekad.");

//   const coords = await Location.getCurrentPositionAsync({});
//   return coords.coords;
// };

// // 🟢 STÄMPLA IN
// export const clockIn = async (lastFour) => {
//   try {
//     const coords = await getCurrentPosition();
//     const location = {
//       type: "Point",
//       coordinates: [coords.longitude, coords.latitude],
//     };

//     console.log("Användarens location  i clockIn", location);

//     const data = await FetchWithAuth(`${BASE_URL}/clocks/in`, {
//       method: "POST",
//       body: JSON.stringify({ lastFour, location }),
//     });

//     // Returnera hela objektet med message + isError
//     return data;
//   } catch (error) {
//     try {
//       const parsed = JSON.parse(error.message);
//       return { isError: true, message: parsed?.message || "Något gick fel" };
//     } catch {
//       return { isError: true, message: "Något gick fel" };
//     }
//   }
// };

// // 🔵 STÄMPLA UT
// export const clockOut = async (lastFour) => {
//   try {
//     const coords = await getCurrentPosition();
//     const location = {
//       type: "Point",
//       coordinates: [coords.longitude, coords.latitude],
//     };

//     console.log("Användarens location i clockOut", location);

//     const data = await FetchWithAuth(`${BASE_URL}/clocks/out`, {
//       method: "POST",
//       body: JSON.stringify({ lastFour, location }),
//     });

//     // Lägg till isError fallback
//     return {
//       message: data?.message || "Stämpling ut lyckades",
//       isError: data?.isError || false,
//     };
//   } catch (error) {
//     try {
//       const parsed = JSON.parse(error.message);
//       return { isError: true, message: parsed?.message || "Något gick fel" };
//     } catch {
//       return { isError: true, message: "Något gick fel" };
//     }
//   }
// };

import * as Location from "expo-location";
import FetchWithAuth from "../lib/fetchWithAuth";
import { BASE_URL } from "./base_url";

const MAX_ACCURACY = 200; // meter, max osäkerhet

const getCurrentPosition = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    return { isError: true, message: "Geolocation-behörighet nekad." };
  }

  const coords = await Location.getCurrentPositionAsync({});

  if (coords.coords.accuracy > MAX_ACCURACY) {
    return {
      isError: true,
      message: "GPS är inte tillräckligt exakt. Slå på Precise Location.",
    };
  }

  return coords.coords;
};

export const clockIn = async (lastFour) => {
  try {
    const coords = await getCurrentPosition();
    if (coords.isError) return coords;

    const location = {
      type: "Point",
      coordinates: [coords.longitude, coords.latitude],
    };

    const data = await FetchWithAuth(`${BASE_URL}/clocks/in`, {
      method: "POST",
      body: JSON.stringify({ lastFour, location }),
    });

    return data;
  } catch (error) {
    return { isError: true, message: error.message || "Något gick fel" };
  }
};

export const clockOut = async (lastFour) => {
  try {
    const coords = await getCurrentPosition();
    if (coords.isError) return coords;

    const location = {
      type: "Point",
      coordinates: [coords.longitude, coords.latitude],
    };

    const data = await FetchWithAuth(`${BASE_URL}/clocks/out`, {
      method: "POST",
      body: JSON.stringify({ lastFour, location }),
    });

    return data;
  } catch (error) {
    return { isError: true, message: error.message || "Något gick fel" };
  }
};
