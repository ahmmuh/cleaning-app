// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { getPlaces } from "../../../../../backend/openStreetMapPlaceApi";
// import { FlatList } from "react-native";
// import { FontAwesome } from "@expo/vector-icons";
// import BackButton from "../../../../../components/backButton";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { addNewTask } from "../../../../../backend/taskAPI";
// import {
//   displayError,
//   displaySuccess,
// } from "../../../../../utils/toastService";
// import usePlaces from "../../../../../hooks/usePlaces";

// function AddTask() {
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();
//   const { unitId } = useLocalSearchParams();
//   console.log("UNIT ID i AddTask", unitId);
//   const [searchText, setSearchText] = useState("");
//   const [selectedtPlace, setSelectedPlace] = useState(null);

//   const { places, filteredPlaces, error, fetchPlaces } = usePlaces();
//   // States
//   // const { title, description, location, coordinates } = req.body;

//   const [task, setTask] = useState({
//     title: "",
//     description: "",
//     location: "",
//     //Danmarksgatan 26753 23 Uppsala
//   });

//   const handleTitleChange = (searchText) => {
//     setTask((prevTask) => ({
//       ...prevTask,
//       title: searchText,
//     }));

//     // fetchPlaces(searchText);
//     setSearchText(searchText);
//   };
//   const choosePlace = (item) => {
//     setTask((prevTask) => ({
//       ...prevTask,
//       title: item.name,
//       location: item.formatted_address,
//     }));
//     setSelectedPlace(item);
//     // setSearchText("");
//   };

//   useEffect(() => {
//     const delayFetchAnrop = setTimeout(() => {
//       if (searchText.trim().length > 1) {
//         fetchPlaces(searchText);
//       }
//     }, 500);

//     return () => clearTimeout(delayFetchAnrop);
//   }, [searchText]);

//   const handleSubmit = () => {
//     if (!task.title || !task.description) return;
//     try {
//       const newTask = {
//         title: task.title,
//         description: task.description,
//         location: task.location,
//       };

//       console.log("NY TASK i AddTask component", newTask);
//       addNewTask(newTask);
//       displaySuccess("Nytt morgonjobb har skapats");
//       router.push("/units");
//     } catch (error) {
//       displayError("Det gick inte att skapa morgonjobb");
//     }
//   };

//   //välj en plats i listan från google place API

//   if (loading) {
//     return (
//       <View
//         style={{
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//           padding: 20,
//         }}>
//         <Text>Loading .....</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <Text>Något gick fel</Text>
//         <BackButton onPress={() => router.navigate("/units")} />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* Title Input */}
//       <TextInput
//         name="title"
//         value={searchText}
//         autoCorrect={false}
//         keyboardType="default"
//         placeholder="Morgonjobb"
//         onChangeText={handleTitleChange}
//         style={styles.inputStyle}
//       />

//       {/* Description Input */}
//       {/* <Text>{task.title ? task.location : ""}</Text> */}
//       <TextInput
//         name="description"
//         placeholder="Beskriv lite om vad som ska göras"
//         value={task.description}
//         autoCorrect={false}
//         keyboardType="default"
//         onChangeText={(text) => setTask({ ...task, description: text })}
//         multiline={true}
//         style={[styles.inputStyle, styles.descriptionStyle]}
//       />

//       {/* Display filtered places */}

//       {task.title && task.location ? (
//         ""
//       ) : (
//         <>
//           {filteredPlaces.length > 0 ? (
//             <FlatList
//               data={filteredPlaces}
//               keyExtractor={(item) => item.place_id}
//               renderItem={({ item }) => (
//                 <View style={styles.searchedPlaceContainer}>
//                   <TouchableOpacity onPress={() => choosePlace(item)}>
//                     {!item.name || item.name === "undefined" ? (
//                       <Text style={styles.fallbackText}>Sök platser</Text>
//                     ) : (
//                       <Text style={styles.foundPlaceTitle}>{task.title}</Text>
//                     )}
//                   </TouchableOpacity>
//                 </View>
//               )}
//             />
//           ) : (
//             ""
//           )}
//         </>
//       )}

//       <Text>{task.title && task.location}</Text>

//       {/* Submit Button */}
//       <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//         <FontAwesome size={18} color={"#ded"} name="edit" />
//         <Text style={styles.submitButtonText}> Nytt uppdrag</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "flex-start",
//     paddingTop: 10,
//     paddingHorizontal: 20,
//     backgroundColor: "#f7f7f7",
//   },

//   inputStyle: {
//     width: "100%",
//     height: 40,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingLeft: 10,
//     fontSize: 16,
//     backgroundColor: "#fff",
//     borderColor: "#ddd",
//   },

//   descriptionStyle: {
//     height: 100,
//     textAlignVertical: "top", // Aligns text to top for multiline input
//     padding: 12,
//   },

//   searchedPlaceContainer: {
//     padding: 10,
//     marginBottom: 8,
//     borderRadius: 8,
//     backgroundColor: "#fff",
//     shadowColor: "#222",
//     shadowOffset: { width: 0, height: 4 },
//     shadowRadius: 6,
//     shadowOpacity: 0.2,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },

//   foundPlaceTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#4CAF50", // Green color for found places
//   },

//   fallbackText: {
//     fontSize: 16,
//     color: "#888", // Gray color for "search places" text
//   },

//   noResultsText: {
//     textAlign: "center",
//     fontSize: 18,
//     color: "#999",
//     marginTop: 20,
//   },

//   submitButton: {
//     backgroundColor: "#bff38c", // Green background
//     paddingVertical: 14,
//     paddingHorizontal: 30,
//     borderRadius: 10,
//     marginTop: 20,
//     justifyContent: "center",
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   submitButtonText: {
//     color: "#000",
//     fontSize: 14,
//     fontWeight: "600",
//   },
// });

// export default AddTask;

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
import { addNewTask } from "../../../../../backend/taskAPI";
import {
  displayError,
  displaySuccess,
} from "../../../../../utils/toastService";
import useFetchPlaces from "../../../../../hooks/usePlaces";

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

        {Array.isArray(places) && places.length > 0 && (
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
