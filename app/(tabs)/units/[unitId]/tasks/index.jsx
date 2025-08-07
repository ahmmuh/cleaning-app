import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { getUnitByID } from "../../../../../backend/api";
// import { deleteTaskById } from "../../../../../backend/taskAPI";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

function TodoScreen() {
  const { unitId } = useLocalSearchParams();
  const router = useRouter();

  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Ej påbörjat");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      const unitData = await getUnitByID(unitId);

      if (!unitData?.tasks) {
        throw new Error("Inga tasks hittades för denna enhet.");
      }

      const uniqueTasks = unitData.tasks.filter(
        (task, index, self) =>
          index === self.findIndex((t) => t._id === task._id)
      );

      setTasks(uniqueTasks);
      setFilteredTasks(
        uniqueTasks.filter((task) => task.status === selectedStatus)
      );
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [unitId]);

  useEffect(() => {
    setFilteredTasks(tasks.filter((task) => task.status === selectedStatus));
  }, [selectedStatus, tasks]);

  const filterTasks = (status) => setSelectedStatus(status);

  // const deleteHandle = async (id) => {
  //   try {
  //     await deleteTaskById(id);
  //     const updated = tasks.filter((task) => task._id !== id);
  //     setTasks(updated);
  //   } catch (err) {
  //     console.log("Kunde inte ta bort task:", err.message);
  //   }
  // };

  const addViewHandler = () => {
    router.push(`/units/${unitId}/tasks/addTask`);
  };

  const editViewHandler = (taskId) => {
    router.push(`/units/${unitId}/tasks/editTask?taskId=${taskId}`);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#84c276" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error.message}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Filter Buttons */}
        <View style={styles.buttonContainer}>
          {["Ej påbörjat", "Påbörjat", "Färdigt"].map((status) => (
            <Pressable
              key={status}
              style={[
                styles.button,
                selectedStatus === status && styles.selectedButton,
              ]}
              onPress={() => filterTasks(status)}>
              <View style={styles.iconWithText}>
                {status === "Ej påbörjat" && (
                  <FontAwesome5 name="circle" size={15} color="#aaa" />
                )}
                {status === "Påbörjat" && (
                  <FontAwesome5 name="adjust" size={18} color="#84c276" />
                )}
                {status === "Färdigt" && (
                  <FontAwesome5 name="check-circle" size={18} color="#28a745" />
                )}
                <Text style={styles.buttonText}>{status}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Add Button */}
        <TouchableOpacity style={styles.addButton} onPress={addViewHandler}>
          <FontAwesome name="plus" size={18} color="#000" />
          <Text style={styles.addButtonText}>Ny todo</Text>
        </TouchableOpacity>

        {/* Tasks */}
        {filteredTasks.length === 0 ? (
          <View style={styles.centered}>
            <Text style={styles.noTaskText}>
              Det finns inget att visa för status "{selectedStatus}"
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredTasks}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.taskCard}>
                <Text style={styles.taskTitle}>{item.title}</Text>

                <Text>
                  <Text style={styles.bold}>Beskrivning:</Text>{" "}
                  {item.description}
                </Text>
                <Text>
                  <Text style={styles.bold}>Adress:</Text> {item.adress}
                </Text>
                <Text style={styles.taskStatus(item.status)}>
                  Status: {item.status}
                </Text>
                {item.status === "Påbörjat" && (
                  <Text>
                    <Text style={styles.bold}>Senast ändrad:</Text>{" "}
                    {new Date(item.updatedAt).toLocaleDateString("sv-SE")}
                  </Text>
                )}

                {item.status === "Ej påbörjat" && (
                  <Text>
                    <Text style={styles.bold}>Skapad:</Text>{" "}
                    {new Date(item.createdAt).toLocaleDateString("sv-SE")}
                  </Text>
                )}

                <View style={styles.actionButtonsContainer}>
                  <TouchableOpacity onPress={() => editViewHandler(item._id)}>
                    <FontAwesome name="edit" size={20} color="green" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, marginTop: 10 },
  container: { flex: 1, paddingHorizontal: 15 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#e0f7d5",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  selectedButton: { backgroundColor: "#84c276" },
  buttonText: { fontSize: 14, marginLeft: 8, color: "#000" },
  iconWithText: { flexDirection: "row", alignItems: "center" },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#d9f8c4",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  addButtonText: {
    fontSize: 16,
    marginLeft: 8,
    color: "#000",
    fontWeight: "bold",
  },
  taskCard: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  taskTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  taskStatus: (status) => ({
    color:
      status === "Färdigt" ? "green" : status === "Påbörjat" ? "orange" : "red",
    fontWeight: "bold",
    marginBottom: 6,
  }),
  bold: { fontWeight: "bold" },
  actionButtonsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noTaskText: {
    fontSize: 16,
    color: "#777",
    paddingHorizontal: 30,
    textAlign: "center",
  },
  errorText: { color: "red", fontSize: 16 },
});

export default TodoScreen;
