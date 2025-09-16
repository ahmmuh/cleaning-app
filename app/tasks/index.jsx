import React, { useCallback } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Button,
} from "react-native";
import useFetchApartment from "../../hooks/useFetchApartment";
import useFetchTasks from "../../hooks/useFetchTasks";
import TaskItem from "./taskItem";
import { Link, useFocusEffect, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

function TaskList() {
  const { tasks, fetchAllTasks, loading, error } = useFetchTasks();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      fetchAllTasks();
    }, [])
  );

  //Loading
  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color="blue" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "red",
        }}>
        <Text style={{ color: "white", fontSize: 19 }}>{error.message}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
        <TouchableOpacity
          style={styles.addTaskButton}
          onPress={() => router.push("/tasks/addTask")}>
          <FontAwesome name="plus" size={18} color="#4CAF50" />
          <Text style={styles.addTaskText}>Nytt morgonjobb</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => <TaskItem item={item} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addTaskButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e6f4ea",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    margin: 10, // ger lite yttre utrymme
  },

  addTaskText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4CAF50",
    marginLeft: 8, // ersätter gap
  },
});

export default TaskList;
