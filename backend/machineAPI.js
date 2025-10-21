// app/api/machine.js
import FetchWithAuth from "../lib/fetchWithAuth";
import { BASE_URL } from "./base_url";

// Skapa maskin
export const createMachine = async (newMachine) => {
  try {
    const data = await FetchWithAuth(`${BASE_URL}/machines`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMachine),
    });
    return data;
  } catch (error) {
    if (error.message.includes("401")) return "unauthorized";
    return null;
  }
};

// Hämta alla maskiner
export const getAllMachines = async () => {
  try {
    const data = await FetchWithAuth(`${BASE_URL}/machines`);
    return data;
  } catch (error) {
    if (error.message.includes("401")) return "unauthorized";
    return null;
  }
};

// Hämta maskin med ID
export const getMachineByID = async (machineId) => {
  try {
    const data = await FetchWithAuth(`${BASE_URL}/machines/${machineId}`);
    return data;
  } catch (error) {
    if (error.message.includes("401")) return "unauthorized";
    return null;
  }
};

// Uppdatera maskin
export const updateMachine = async (machineId, updatedMachine) => {
  try {
    const data = await FetchWithAuth(`${BASE_URL}/machines/${machineId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMachine),
    });
    return data;
  } catch (error) {
    if (error.message.includes("401")) return "unauthorized";
    return null;
  }
};

// Ta bort maskin
export const deleteMachine = async (machineId) => {
  try {
    const data = await FetchWithAuth(`${BASE_URL}/machines/${machineId}`, {
      method: "DELETE",
    });
    return data;
  } catch (error) {
    if (error.message.includes("401")) return "unauthorized";
    return null;
  }
};

// Låna maskin
export const borrowMachine = async (machineId, userId) => {
  try {
    const data = await FetchWithAuth(
      `${BASE_URL}/machines/${machineId}/borrow`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      }
    );
    return data;
  } catch (error) {
    if (error.message.includes("401")) return "unauthorized";
    return null;
  }
};

// Återlämna maskin
export const returnMachine = async (machineId) => {
  try {
    const data = await FetchWithAuth(
      `${BASE_URL}/machines/${machineId}/return`,
      {
        method: "POST",
      }
    );
    return data;
  } catch (error) {
    if (error.message.includes("401")) return "unauthorized";
    return null;
  }
};

// Sök maskiner
export const searchMachines = async (query) => {
  if (!query.trim()) return [];
  try {
    const data = await FetchWithAuth(
      `${BASE_URL}/machines/search?name=${query}`
    );
    return data.data || [];
  } catch (error) {
    if (error.message.includes("401")) return "unauthorized";
    return [];
  }
};

// Maskin-loggar
export const getMachineLogs = async () => {
  try {
    const data = await FetchWithAuth(`${BASE_URL}/machines/logs`);
    return data;
  } catch (error) {
    if (error.message.includes("401")) return "unauthorized";
    return null;
  }
};
