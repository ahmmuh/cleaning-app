import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getPlaces } from "../../../../../backend/googlePlaceApi";
import { FlatList } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import MainLink from "../../../../../components/link";
import BackButton from "../../../../../components/backButton";
import { useLocalSearchParams, useRouter } from "expo-router";
import { addNewTask } from "../../../../../backend/taskAPI";
import usePlaces from "../../../../../hooks/usePlaces";
import {
  displayError,
  displaySuccess,
} from "../../../../../utils/toastService";

function AddTask() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { unitId } = useLocalSearchParams();
  console.log("UNIT ID i AddTask", unitId);

  // States
  const [task, setTask] = useState({
    title: "",
    description: "",
    location: "",
    //Danmarksgatan 26753 23 Uppsala
  });

  const [searchText, setSearchText] = useState("");
  const [selectedtPlace, setSelectedPlace] = useState(null);

  const { places, filteredPlaces, error, fetchPlaces } = usePlaces();

  const handleTitleChange = (searchText) => {
    setTask((prevTask) => ({
      ...prevTask,
      title: searchText,
    }));

    // fetchPlaces(searchText);
    setSearchText(searchText);
  };
  const choosePlace = (item) => {
    setTask((prevTask) => ({
      ...prevTask,
      title: item.name,
      location: item.formatted_address,
    }));
    setSelectedPlace(item);
    // setSearchText("");
  };

  useEffect(() => {
    const delayFetchAnrop = setTimeout(() => {
      if (searchText.trim().length > 1) {
        fetchPlaces(searchText);
      }
    }, 500);

    return () => clearTimeout(delayFetchAnrop);
  }, [searchText]);

  const handleSubmit = () => {
    if (!task.title || !task.description) return;
    try {
      const newTask = {
        title: task.title,
        description: task.description,
        location: task.location,
      };

      console.log("NY TASK i AddTask component", newTask);
      addNewTask(unitId, newTask);
      displaySuccess("En ny todo har skapats");
      router.push("/tasks");
    } catch (error) {
      displayError("Det gick inte att skapa ny todo");
    }
  };

  //välj en plats i listan från google place API

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}>
        <Text>Loading .....</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Något gick fel</Text>
        <BackButton onPress={() => router.navigate("/units")} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Title Input */}
      <TextInput
        name="title"
        value={searchText}
        placeholder="Todo title"
        onChangeText={handleTitleChange}
        style={styles.inputStyle}
      />

      {/* Description Input */}
      {/* <Text>{task.title ? task.location : ""}</Text> */}
      <TextInput
        name="description"
        placeholder="Beskriv lite om vad som ska göras"
        value={task.description}
        onChangeText={(text) => setTask({ ...task, description: text })}
        multiline={true}
        style={[styles.inputStyle, styles.descriptionStyle]}
      />

      {/* Display filtered places */}

      {task.title && task.location ? (
        ""
      ) : (
        <>
          {filteredPlaces.length > 0 ? (
            <FlatList
              data={filteredPlaces}
              keyExtractor={(item) => item.place_id}
              renderItem={({ item }) => (
                <View style={styles.searchedPlaceContainer}>
                  <TouchableOpacity onPress={() => choosePlace(item)}>
                    {!item.name || item.name === "undefined" ? (
                      <Text style={styles.fallbackText}>Sök platser</Text>
                    ) : (
                      <Text style={styles.foundPlaceTitle}>{task.title}</Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            />
          ) : (
            ""
          )}
        </>
      )}

      <Text>{task.title && task.location}</Text>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <FontAwesome size={18} color={"#ded"} name="edit" />
        <Text style={styles.submitButtonText}> Ny Todo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f7f7f7",
  },

  inputStyle: {
    width: "100%",
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    borderColor: "#ddd",
  },

  descriptionStyle: {
    height: 100,
    textAlignVertical: "top", // Aligns text to top for multiline input
    padding: 12,
  },

  searchedPlaceContainer: {
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#222",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  foundPlaceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4CAF50", // Green color for found places
  },

  fallbackText: {
    fontSize: 16,
    color: "#888", // Gray color for "search places" text
  },

  noResultsText: {
    textAlign: "center",
    fontSize: 18,
    color: "#999",
    marginTop: 20,
  },

  submitButton: {
    backgroundColor: "#bff38c", // Green background
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },

  submitButtonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default AddTask;
