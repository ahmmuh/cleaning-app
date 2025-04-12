import { BASE_URL } from "./base_url";

export const addNewTask = async (unitId, newTask) => {
  try {
    const res = await fetch(`${BASE_URL}/units/${unitId}/tasks/add`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
    if (!res.ok) {
      console.error(`Error meddelande vid skapandet av ny uppgift
          status: ${res.status} meddelande: ${res.statusText}`);
      return null;
    }
    const data = await res.json();
    console.log(`Uppdaterad enhet med ny task`, data);
    return data;
  } catch (error) {
    console.error(
      `Serverfle vid uppdatering av enhet med ny task, Meddelande: ${error.message}`
    );
    return null;
  }
};

export const getTaskByID = async (unitId, taskId) => {
  try {
    const res = await fetch(`${BASE_URL}/units/${unitId}/tasks/${taskId}`);
    if (!res.ok) {
      console.log(`Server error when fething data, status: ${res.status}`);
      return null;
    }
    const data = await res.json();
    console.log("Hämtat data från servern ", data);
    return data;
  } catch (error) {
    if (error instanceof Error) console.error("Server Error: ", error.message);
  }
};
