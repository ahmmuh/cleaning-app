import { Link, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native";
import { getUnitByID } from "../../../../../backend/api";
import { formatDate } from "../../../../../date/dateFormat";
import BackButton from "../../../../../components/backButton";
import { FontAwesome } from "@expo/vector-icons";
import MainLink from "../../../../../components/link";
import { Button } from "react-native";

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
            <Text style={styles.buttonText}>Ej påbörjat</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text
              style={styles.buttonText}
              onPress={() => filterTasks("Färdigt")}>
              Färdigt
            </Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => filterTasks("Påbörjat")}>
            <Text style={styles.buttonText}>Påbörjat</Text>
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
                <FontAwesome name="plus" size={20} color={"#000"} />
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
                      <Text>{item.description}</Text>
                      <Text>Senast ändrad: {formatDate(item.Uppdaterats)}</Text>
                    </View>
                  )}
                  {item.completed === "Ej påbörjat" && (
                    <View>
                      <Text style={{ color: "red", fontWeight: "bold" }}>
                        Status: {item.completed}
                      </Text>
                      <Text>{item.description} </Text>
                      <Text>
                        Skapad:{" "}
                        {item.skapad
                          ? formatDate(item.skapad)
                          : formatDate(item.skapats)}
                      </Text>
                    </View>
                  )}
                  {item.completed === "Påbörjat" && (
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: "orange", fontWeight: "bold" }}>
                        Status: {item.completed}
                      </Text>
                      <Text>{item.description} </Text>

                      <Text>Senast ändrad: {formatDate(item.Uppdaterats)}</Text>
                    </View>
                  )}

                  {item.completed === "Ej påbörjat" && (
                    <View style={{ flex: 1 }}>
                      <Link
                        href={`/units/${item._id}/tasks`}
                        style={{
                          backgroundColor: "#ddd",
                          padding: 10,
                          marginVertical: 10,
                          borderWidth: 0,
                        }}>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: "center",
                            flexDirection: "row",
                            alignItems: "center",
                          }}>
                          <Text> Hjälp oss idag</Text>
                          <FontAwesome
                            name="heart"
                            size={15}
                            color={"red"}
                            style={{ marginTop: 10, marginLeft: 10 }}
                          />
                        </View>
                      </Link>
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
    marginBottom: 20,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
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
    fontSize: 16,
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
    marginLeft: 10,
    padding: 6,
    width: "30%",
  },
});
export default TodoScreen;
