import React, { useCallback } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import useFetchApartment from "../../hooks/useFetchApartment";
import { SafeAreaView } from "react-native-safe-area-context";
import useFetchTasks from "../../hooks/useFetchTasks";
import TaskItem from "./taskItem";

function TaskList() {
  const { tasks, loading, error } = useFetchTasks();

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
      <View>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => <TaskItem item={item} />}
        />
      </View>
    </SafeAreaView>
  );
}

export default TaskList;
