import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import { getTaskByID } from "../../../../../backend/taskAPI";
import { Picker } from "@react-native-picker/picker";

function EditTask() {
  //   const [contentHeight, setContentHeight] = useState(40); // För att hantera dynamisk höjd
  const [task, setTask] = useState({
    title: "",
    description: "",
    location: "",
    completed: "Ej påbörjat", // Startvärde för completed
  });

  const statusar = ["Ej påbörjat", "Påbörjat", "Färdigt"];
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { unitId, taskId } = useLocalSearchParams();

  const [selectStatus, setSelectStatus] = useState("");

  console.log("Task which will be updated", taskId);
  console.log("Unit which will be updated", unitId);

  const fetchTask = async () => {
    try {
      const foundedTask = await getTaskByID(unitId, taskId);
      if (!foundedTask) {
        throw new Error("Denna task finns inte");
      }
      console.log("Founded task", foundedTask);
      setTask(foundedTask);
      setLoading(false);
    } catch (error) {
      console.error(
        "Error in navigating to edit task component via UnitId and taskId"
      );
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [unitId, taskId]);

  //update status

  useEffect(() => {
    if (!task.completed && selectStatus !== task.completed) {
      setSelectStatus(task.completed);
    }
  }, [task.completed, selectStatus]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={"#007AFF"} size={"large"} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error.message}</Text>
      </View>
    );
  }

  //   useEffect(() => {
  //     setContentHeigh();
  //   }, [contentHeight]);

  //update the task

  const handleSubmit = () => {
    try {
      const updatedTask = {
        title: task.title,
        description: task.description,
        location: task.location,
        completed: selectStatus,
      };
      console.log("Updated", updatedTask);
    } catch (error) {
      console.log("Can not updated", error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.statusTitle}>Uppdatera status för {task.title}</Text>
      {task && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            name="title"
            value={task.title}
            onChangeText={(text) =>
              setTask((prevTask) => ({
                ...prevTask,
                title: text,
              }))
            }
            placeholder="Task Title"
          />
          <TextInput
            name="description"
            style={[styles.textInput, styles.descriptionInput]}
            value={task.description}
            onChangeText={(text) =>
              setTask((prevTask) => ({
                ...prevTask,
                description: text,
              }))
            }
            placeholder="Description"
            multiline
          />
          <TextInput
            name="location"
            style={styles.textInput}
            value={task.location || ""}
            onChangeText={(text) =>
              setTask((prevTask) => ({
                ...prevTask,
                location: text,
              }))
            }
            placeholder="Location"
          />
          <View style={styles.selectContainer}>
            <Text style={styles.statusTitle}>Status AHmed</Text>
            <Picker
              selectedValue={task.completed}
              onValueChange={setSelectStatus}
              style={styles.picker}>
              {statusar.map((status, index) => (
                <Picker.Item key={index} label={status} value={status} />
              ))}
            </Picker>
          </View>

          <TouchableOpacity style={styles.updateButton} onPress={handleSubmit}>
            <Text style={styles.buttonTitle}>Update</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
  textInput: {
    width: "90%",
    height: 50,
    marginBottom: 12,
    paddingLeft: 15,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    backgroundColor: "#fff",
    color: "#333",
  },
  updateButton: {
    width: "60%",
    height: 45,
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 12,
    backgroundColor: "#ded",
  },
  buttonTitle: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  descriptionInput: {
    minHeight: 80, // Minimumhöjd för description för att ge mer utrymme
    height: Math.max(40), // Dynamisk höjd beroende på innehållet
    textAlignVertical: "top", // Texten ska börja från toppen
    paddingTop: 10, // Lite extra utrymme på toppen
  },

  //picker style

  selectContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },

  picker: {
    height: 50,
    width: 200,
  },
  statusTitle: {
    fontSize: 15,
    marginBottom: 20,
    color: "#000",
  },

  taskTitle: {
    color: "#666",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default EditTask;
