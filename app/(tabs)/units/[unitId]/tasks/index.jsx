import { Link, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Touchable,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native";
import { getUnitByID } from "../../../../../backend/api";
import { formatDate } from "../../../../../date/dateFormat";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { deleteTaskById } from "../../../../../backend/taskAPI";

function TodoScreen() {
  const { unitId } = useLocalSearchParams();
  const router = useRouter();

  // custom code
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //date format

  //filter tasks

  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Ej påbörjat");

  //buttons array

  console.log("unitId", unitId);

  //functions

  const fetchTasks = async () => {
    try {
      const taskData = await getUnitByID(unitId);
      if (!taskData.tasks) {
        console.log("Enheten finns inte");
      }
      // const filterSameKeys = taskData.tasks.filter(
      //   (task) => task._id !== task._id
      // );

      const uniqueTasks = taskData.tasks.filter(
        (task, index, self) =>
          index === self.findIndex((t) => t._id === task._id)
      );

      console.log("Tasks hittades i TASK COMPONENT", uniqueTasks);
      setTasks(uniqueTasks);
      setFilteredTasks(uniqueTasks);
      setLoading(false);
    } catch (error) {
      throw new Error("Error vid hämtning av tasks via enhet", error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [unitId]);

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <Text>Loading ....</Text>
      </View>
    );
  }

  const filterTasks = (status) => {
    setSelectedStatus(status);
    const filtered = tasks.filter((tasks) => tasks.completed === status);
    console.log("Status", filtered);
    setFilteredTasks(filtered);
  };

  const deleteHandle = async (id) => {
    try {
      await deleteTaskById(unitId, id);
      const updatedTasks = tasks.filter((task) => task._id !== id);
      setTasks(updatedTasks);
      setFilteredTasks(
        updatedTasks.filter((task) => task.completed === selectedStatus)
      );
    } catch (err) {
      console.log("Kunde inte ta bort task:", err.message);
    }
  };

  const addViewHandler = (unitId) => {
    router.push(`/units/${unitId}/tasks/addTask`);
  };

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red" }}>{error.message}</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, marginTop: 10 }}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => filterTasks("Ej påbörjat")}>
            <View style={styles.iconWithText}>
              <FontAwesome5 name="circle" size={15} color="#aaa" />
              <Text style={styles.buttonText}>Ej påbörjat</Text>
            </View>
          </Pressable>
          <Pressable style={styles.button}>
            <View style={styles.iconWithText}>
              <Text
                style={styles.buttonText}
                onPress={() => filterTasks("Färdigt")}>
                Färdigt
              </Text>
              <FontAwesome5 name="check-circle" size={15} color="#28a745" />
            </View>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => filterTasks("Påbörjat")}>
            <View style={styles.iconWithText}>
              <Text style={styles.buttonText}>Påbörjat</Text>
              <FontAwesome5
                name="adjust"
                size={18}
                color="#aaa"
                style={{ marginRight: 10, color: "#84c276" }}
              />
            </View>
          </Pressable>
        </View>

        {filteredTasks.length === 0 ? (
          <View style={{ flex: 1 }}>
            <Text style={styles.noTaskText}>
              Det finns inget att visa för status "{selectedStatus}"
            </Text>
          </View>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => addViewHandler(unitId)}
              style={styles.addButton}>
              <Text style={{ color: "#000", fontSize: 17 }}>
                <FontAwesome name="plus" size={20} color={"#000"} /> Ny todo
              </Text>
            </TouchableOpacity>
            <FlatList
              data={filteredTasks}
              keyExtractor={(item) => `${item._id}-${item.title}`}
              renderItem={({ item }) => (
                <View style={styles.tasksContainer} key={item._id}>
                  <Text style={styles.taskTitle}>{item.title}</Text>
                  {item.completed === "Färdigt" && (
                    <View>
                      <Text style={{ color: "green", fontWeight: "bold" }}>
                        Status: {item.completed}
                      </Text>
                      <Text>
                        {" "}
                        <Text style={{ fontWeight: "bold" }}>Besktivning:</Text>
                        {item.description}
                      </Text>
                      <Text>
                        <Text style={{ fontWeight: "bold" }}>Address: </Text>
                        {item.location}
                      </Text>
                      <Text>Senast ändrad: {formatDate(item.Uppdaterats)}</Text>
                      <View style={styles.actionButtonsContainer}>
                        <TouchableOpacity
                          style={{ marginRight: 20 }}
                          onPress={() =>
                            router.navigate(
                              `/units/${unitId}/tasks/editTask?taskId=${item._id}`
                            )
                          }>
                          <FontAwesome name="edit" color={"green"} size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => deleteHandle(item._id)}>
                          <FontAwesome name="trash" color={"red"} size={20} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                  {item.completed === "Ej påbörjat" && (
                    <View>
                      <Text style={{ color: "red", fontWeight: "bold" }}>
                        Status: {item.completed}
                      </Text>
                      <Text>
                        <Text style={{ fontWeight: "bold" }}>Besktivning:</Text>
                        {item.description}{" "}
                      </Text>
                      <Text>
                        <Text style={{ fontWeight: "bold" }}>Address: </Text>
                        {item.location}
                      </Text>

                      <Text>
                        Skapad:{" "}
                        {item.skapad
                          ? formatDate(item.skapad)
                          : formatDate(item.skapats)}
                      </Text>
                      <Text style={{ fontWeight: "bold" }}>
                        {" "}
                        Hjälp oss idag{" "}
                        <FontAwesome
                          name="heart"
                          size={15}
                          color={"red"}
                          style={{ marginTop: 10, marginLeft: 10 }}
                        />
                      </Text>

                      <View style={styles.actionButtonsContainer}>
                        <TouchableOpacity
                          style={{ marginRight: 20 }}
                          onPress={() =>
                            router.navigate(
                              `/units/${unitId}/tasks/editTask?taskId=${item._id}`
                            )
                          }>
                          <FontAwesome name="edit" color={"green"} size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => deleteHandle(item._id)}>
                          <FontAwesome name="trash" color={"red"} size={20} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                  {item.completed === "Påbörjat" && (
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: "orange", fontWeight: "bold" }}>
                        Status: {item.completed}
                      </Text>
                      <Text>
                        {" "}
                        <Text style={{ fontWeight: "bold" }}>
                          Besktivning:
                        </Text>{" "}
                        {item.description}{" "}
                      </Text>

                      <Text style={{ fontWeight: "bold" }}>
                        Address:
                        {item.location}
                      </Text>
                      <Text>Senast ändrad: {formatDate(item.Uppdaterats)}</Text>
                      <View style={styles.actionButtonsContainer}>
                        <TouchableOpacity
                          style={{ marginRight: 20 }}
                          onPress={() =>
                            router.navigate(
                              `/units/${unitId}/tasks/editTask?taskId=${item._id}`
                            )
                          }>
                          <FontAwesome name="edit" color={"green"} size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => deleteHandle(item._id)}>
                          <FontAwesome name="trash" color={"red"} size={20} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              )}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginBottom: 20,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#bff38c", // Light green background
    paddingVertical: 12, // Adjusted padding
    paddingHorizontal: 25, // Adjusted padding for button size
    marginBottom: 10, // Margin between buttons
    borderRadius: 5, // Rounded corners
    shadowColor: "#ccc", // Light shadow for better visibility
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: "#000",
    fontSize: 12,
  },
  iconWithText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  tasksContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f4f4f4",
    borderRadius: 5,
  },

  taskTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  textStatus: {
    fontWeight: "bold",
  },
  noTaskText: {
    textAlign: "center",
    fontSize: 18,
    color: "#000",
    marginTop: 20,
    paddingHorizontal: 40,
  },

  addButton: {
    alignSelf: "flex-start",
    padding: 6,
    width: "30%",
    backgroundColor: "#ded",
  },

  actionButtonsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#e1e1e1",
  },
});
export default TodoScreen;
