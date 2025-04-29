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

export const updateApartment = async (apartmentId, updatedApartment) => {
  try {
    const res = await fetch(`${BASE_URL}/apartments/${apartmentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedApartment),
    });
    if (!res.ok) {
      console.error(
        `Fel vid uppdatering av Apartment. Status: ${res.status} (${res.statusText})`
      );
      return null;
    }
    const data = await res.json();
    console.log(
      `UPDATED Apartment ) ${updatedApartment}  med ID ${apartmentId}`
    );
    return data;
  } catch (error) {
    console.error(`Error on the Server ${error.message}`);
  }
};
