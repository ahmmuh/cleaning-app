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
import { router, useRouter } from "expo-router";

function AddTask() {
  const router = useRouter();
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  // States
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  // Fetch places from API
  const fetchPlaces = async (searchText) => {
    try {
      const placeData = await getPlaces(searchText);
      if (!placeData.results) {
        // throw new Error("The place you are searching was not found");
        placeData.results = [];
      }

      console.log("Founded place:", placeData.results);
      setPlaces(placeData.results);
      setFilteredPlaces(placeData.results);
      setLoading(false);
    } catch (error) {
      console.error("Error vid hämtning av platser", error.message);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const handleTitleChange = (searchText) => {
    setTask((prevTask) => ({
      ...prevTask,
      title: searchText,
    }));

    fetchPlaces(searchText);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPlaces();
  };

  if (loading) {
    return <Text>Loading .....</Text>;
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
        value={task.title}
        placeholder="Todo title"
        onChangeText={handleTitleChange}
        style={styles.inputStyle}
      />

      {/* Description Input */}
      <TextInput
        name="description"
        placeholder="Beskriv lite om vad som ska göras"
        value={task.description}
        onChangeText={(text) => setTask({ ...task, description: text })}
        multiline={true}
        style={[styles.inputStyle, styles.descriptionStyle]}
      />

      {/* Display filtered places */}
      {filteredPlaces.length > 0 ? (
        <FlatList
          data={filteredPlaces}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <View style={styles.searchedPlaceContainer}>
              <TouchableOpacity>
                {!item.name || item.name === "undefined" ? (
                  <Text style={styles.fallbackText}>Sök platser</Text>
                ) : (
                  <Text style={styles.foundPlaceTitle}>
                    {task.title ? item.name : null}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noResultsText}>Inga platser hittades</Text>
      )}

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <FontAwesome size={18} color={"ded"} name="edit" />
        <Text style={styles.submitButtonText}> Ny Task</Text>
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
