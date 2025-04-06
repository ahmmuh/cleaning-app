import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { getUnitByID } from "../../../../backend/api";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native";

function TodoScreen() {
  const { unitId } = useLocalSearchParams();
  const router = useRouter();

  // custom code
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //filter tasks

  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Ej påbörjat");

  const fetchTasks = async () => {
    try {
      const taskData = await getUnitByID(unitId);
      if (!taskData.tasks) {
        console.log("Enheten finns inte");
      }

      console.log("Tasks hittades i TASK COMPONENT", taskData.tasks);
      setTasks(taskData.tasks);
      setFilteredTasks(taskData.tasks);
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

        {filterTasks.length < 0 ? (
          <View style={{ flex: 1 }}>
            <Text style={styles.noTaskText}>
              Det finns inget att visa {selectedStatus}{" "}
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredTasks}
            renderItem={({ item }) => (
              <View style={styles.tasksContainer}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text>Status: {item.completed}</Text>
                <Text>uppdaterades: {item.Uppdaterats}</Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },

  tasksContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f4f4f4",
    borderRadius: 5,
  },

  taskTitle: {
    fontWeight: "bold",
  },

  noTaskText: {
    textAlign: "center",
    fontSize: 18,
    color: "#777",
    marginTop: 20,
  },
});
export default TodoScreen;

// {tasks.map((task) => (
// <View key={task._id} style={styles.buttonContainer}>
//   {task.completed == "Ej påbörjat" && (
//     <Pressable style={styles.button}>
//       <Text style={styles.buttonText}>{task.completed}</Text>
//     </Pressable>
//   )}

//   {task.completed == "Påbörjat" && (

//   )}

//   {task.completed == "Färdigt" && (

//   )}
// </View>
// ))}
