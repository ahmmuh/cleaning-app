import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

import { addNewTask } from "../../backend/taskAPI";
import { displayError, displaySuccess } from "../../utils/toastService";
import useFetchPlaces from "../../hooks/usePlaces";

export default function AddTask() {
  const router = useRouter();

  const [task, setTask] = useState({
    title: "",
    description: "",
    location: "",
    coordinates: null,
  });

  const [searchText, setSearchText] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);

  const { places, loading, fetchPlaceData } = useFetchPlaces();

  // Validera formulär
  const isFormValid = () =>
    task.title.trim() !== "" && task.description.trim() !== "";

  // Hantera platsinput (autocomplete)
  const handlePlaceInputChange = (text) => {
    setSearchText(text);
    setTask((prev) => ({ ...prev, title: text }));

    if (text.length > 1) {
      fetchPlaceData(text);
    }
  };

  // Hantera övriga inputs
  const handleChange = (name, value) => {
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  // Submit
  const handleSubmit = async () => {
    if (!isFormValid()) {
      displayError("Fyll i titel och beskrivning");
      return;
    }

    try {
      const newTask = {
        title: task.title,
        description: task.description,
        location: task.location,
        coordinates: task.coordinates, // ✅ nu sparas även coordinates
      };

      console.log("NY TASK i AddTask component", newTask);

      await addNewTask(newTask);
      displaySuccess("Nytt morgonjobb har skapats");
      router.push("/units");

      // Reset state
      setTask({ title: "", description: "", location: "", coordinates: null });
      setSearchText("");
      setSelectedPlace(null);

      router.push("/units");
    } catch (error) {
      console.error("Fel vid skapande av task:", error);
      displayError(`Det gick inte att skapa morgonjobb: ${error.message}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Skapa morgonjobb</Text>

      {/* Platsinput */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ange plats, t.ex. Katedralskolan"
          value={searchText || ""}
          onChangeText={handlePlaceInputChange}
          autoCorrect={true}
          keyboardType="default"
          autoCapitalize="sentences"
          textContentType="none"
        />
        {loading && <Text>Vi hämtar platser åt dig...</Text>}

        {Array.isArray(places) && places.length > 0 && !selectedPlace && (
          <View style={styles.results}>
            {places.map((place, index) => (
              <TouchableOpacity
                key={index}
                style={styles.resultItem}
                onPress={() => {
                  setTask((prev) => ({
                    ...prev,
                    title: place.name,
                    location: place.adress,
                    coordinates: place.coordinates, // ✅ spara koordinaterna här
                  }));
                  setSearchText(place.name);
                  setSelectedPlace(place);
                }}>
                <Text>
                  {place.name} ({place.adress})
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Beskrivning */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Beskriv uppdraget, t.ex. Vi har personalbrist på Katedralskolan..."
          value={task.description || ""}
          onChangeText={(text) => handleChange("description", text)}
          multiline
          numberOfLines={6}
          autoCorrect={true}
          keyboardType="default"
          autoCapitalize="sentences"
          textContentType="none"
        />
      </View>

      {/* Spara */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Spara</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 17,
    fontWeight: "600",
    color: "#4d7ee8ff", // blå
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  textarea: {
    height: 120,
    textAlignVertical: "top",
  },
  results: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    maxHeight: 200,
  },
  resultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  button: {
    backgroundColor: "#c7d2fe", // indigo-200
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#a5b4fc", // indigo-300
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1e1b4b", // mörk indigo
  },
});
