import { BASE_URL } from "./base_url";

export const getAllApartments = async () => {
  try {
    const res = await fetch(`${BASE_URL}/apartments`);
    if (!res.ok) {
      throw new Error(`HTTP Error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log("Apartment data from getAllApartments() ", data);
    return data;
  } catch (error) {
    if (error instanceof Error)
      console.error("Error fetching apartments,", error.message);
    return null;
  }
};
