import * as Location from "expo-location";
import FetchWithAuth from "../lib/fetchWithAuth";
import { BASE_URL } from "./base_url";

const getCurrentPosition = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Geolocation behörighet nekad.");
  }

  const coords = await Location.getCurrentPositionAsync({});
  return coords.coords;
};

// ===============================
// 🟢 STÄMPLA IN
// ===============================
export const clockIn = async (lastFour) => {
  console.log("▶️ clockIn startar...", lastFour);

  try {
    const coords = await getCurrentPosition();
    console.log("📍 Position hämtad:", coords);

    const location = {
      type: "Point",
      coordinates: [coords.longitude, coords.latitude],
    };

    const res = await FetchWithAuth(`${BASE_URL}/clocks/in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lastFour, location }),
    });

    console.log("📡 clockIn svarstatus:", res.status);

    if (!res.ok) {
      // const errorText = await res.text();
      // console.error("⚠️ clockIn misslyckades:", errorText);
      // throw new Error(errorText || "Misslyckades med clock in");
      return;
    }

    const data = await res.json();
    console.log("✅ clockIn data:", data);
    return data;
  } catch (error) {
    // console.error("💥 clockIn error:", error.message);
    return;
  }
};

// ===============================
// 🔵 STÄMPLA UT
// ===============================
export const clockOut = async (lastFour) => {
  console.log("▶️ clockOut startar...", lastFour);

  try {
    const coords = await getCurrentPosition();
    console.log("📍 Position hämtad:", coords);

    const location = {
      type: "Point",
      coordinates: [coords.longitude, coords.latitude],
    };

    const res = await FetchWithAuth(`${BASE_URL}/clocks/out`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lastFour, location }),
    });

    console.log("📡 clockOut svarstatus:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("⚠️ clockOut misslyckades:", errorText);
      throw new Error(errorText || "Misslyckades med clock out");
    }

    const data = await res.json();
    console.log("✅ clockOut data:", data);
    return data;
  } catch (error) {
    console.error("💥 clockOut error:", error.message);
    throw error;
  }
};
