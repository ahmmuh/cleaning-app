import FetchWithAuth from "../lib/fetchWithAuth";
import { BASE_URL } from "./base_url";

export const getWorkplaces = async () => {
  try {
    const data = await FetchWithAuth(`${BASE_URL}/workplaces`);
    console.log("workplaces data from getWorkplaces() ", data);
    return data;
  } catch (error) {
    if (error instanceof Error)
      console.error("Error fetching workplaces,", error.message);
    return null;
  }
};
