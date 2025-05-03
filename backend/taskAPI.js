import { BASE_URL } from "./base_url";

//alla tasks för alla enheter
export const getAllTasks = async () => {
  try {
    const res = await fetch(`${BASE_URL}/tasks`);
    if (!res.ok) {
      throw new Error(`HTTP Error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log("task data from getAllTasks() ", data);
    return data;
  } catch (error) {
    if (error instanceof Error)
      console.error("Error fetching tasks,", error.message);
    return null;
  }
};
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

//tilldela task

export const assignTaskToUnit = async (unitId, taskId, assignedTask) => {
  try {
    const res = await fetch(
      `${BASE_URL}/units/${unitId}/tasks/${taskId}/assign`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assignedTask),
      }
    );
    if (!res.ok) {
      console.error(
        `Fel vid uppdatering av task. Status: ${res.status} (${res.statusText})`
      );
      return null;
    }
    const data = await res.json();
    console.log(`Tilldelad ${data} Utförs av enhet med ID ${unitId}`);
    return data;
  } catch (error) {
    console.error(`Error on the Server ${error.message}`);
  }
};

//delete task

// DELETE TASK

export const deleteTaskById = async (unitId, taskId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/units/${unitId}/tasks/${taskId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      console.log(`Error deleting task: ${response.status}`);
      return;
    }

    const data = await response.json();
    console.log(`Task deleted: ${data.message}`);
  } catch (error) {
    console.error("Error deleting task:", error.message);
  }
};
