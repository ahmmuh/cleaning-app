//workplaceRoute.get("/units/:unitId/workplaces", getAllWorkPlaces);

import FetchWithAuth from "../lib/fetchWithAuth";
import { BASE_URL } from "./base_url";

export const getWorkplaces = async (unitId) => {
  try {
    const res = await FetchWithAuth(`${BASE_URL}/units/${unitId}/workplaces`);
    if (!res.ok) {
      throw new Error(`HTTP Error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log("Workplaces data from getWorkplaces() ", data);
    return data;
  } catch (error) {
    if (error instanceof Error)
      console.error("Error fetching Workplaces,", error.message);
    return null;
  }
};
