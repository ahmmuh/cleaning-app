// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
// } from "react-native";
// import { useRouter } from "expo-router";

// import { addNewTask } from "../../backend/taskAPI";
// import { displayError, displaySuccess } from "../../utils/toastService";
// import useFetchPlaces from "../../hooks/usePlaces";

// export default function AddTask() {
//   const router = useRouter();

//   const [task, setTask] = useState({
//     title: "",
//     description: "",
//     location: "",
//     coordinates: null,
//   });

//   const [searchText, setSearchText] = useState("");
//   const [selectedPlace, setSelectedPlace] = useState(null);

//   const { places, loading, fetchPlaceData } = useFetchPlaces();

//   // Validera formulär
//   const isFormValid = () =>
//     task.title.trim() !== "" && task.description.trim() !== "";

//   // Hantera platsinput (autocomplete)
//   const handlePlaceInputChange = (text) => {
//     setSearchText(text);
//     setTask((prev) => ({ ...prev, title: text }));

//     if (text.length > 1) {
//       fetchPlaceData(text);
//     }
//   };

//   // Hantera övriga inputs
//   const handleChange = (name, value) => {
//     setTask((prev) => ({ ...prev, [name]: value }));
//   };

//   // Submit
//   const handleSubmit = async () => {
//     if (!isFormValid()) {
//       displayError("Fyll i titel och beskrivning");
//       return;
//     }

//     try {
//       const newTask = {
//         title: task.title,
//         description: task.description,
//         location: task.location,
//         coordinates: task.coordinates, // ✅ nu sparas även coordinates
//       };

//       console.log("NY TASK i AddTask component", newTask);

//       await addNewTask(newTask);
//       displaySuccess("Nytt morgonjobb har skapats");
//       router.push("/units");

//       // Reset state
//       setTask({ title: "", description: "", location: "", coordinates: null });
//       setSearchText("");
//       setSelectedPlace(null);

//       router.push("/units");
//     } catch (error) {
//       console.error("Fel vid skapande av task:", error);
//       displayError(`Det gick inte att skapa morgonjobb: ${error.message}`);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.header}>Skapa morgonjobb</Text>

//       {/* Platsinput */}
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Ange plats, t.ex. Katedralskolan"
//           value={searchText || ""}
//           onChangeText={handlePlaceInputChange}
//           autoCorrect={true}
//           keyboardType="default"
//           autoCapitalize="sentences"
//           textContentType="none"
//         />
//         {loading && <Text>Vi hämtar platser åt dig...</Text>}

//         {Array.isArray(places) && places.length > 0 && !selectedPlace && (
//           <View style={styles.results}>
//             {places.map((place, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={styles.resultItem}
//                 onPress={() => {
//                   setTask((prev) => ({
//                     ...prev,
//                     title: place.name,
//                     location: place.adress,
//                     coordinates: place.coordinates, // ✅ spara koordinaterna här
//                   }));
//                   setSearchText(place.name);
//                   setSelectedPlace(place);
//                 }}>
//                 <Text>
//                   {place.name} ({place.adress})
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         )}
//       </View>

//       {/* Beskrivning */}
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={[styles.input, styles.textarea]}
//           placeholder="Beskriv uppdraget, t.ex. Vi har personalbrist på Katedralskolan..."
//           value={task.description || ""}
//           onChangeText={(text) => handleChange("description", text)}
//           multiline
//           numberOfLines={6}
//           autoCorrect={true}
//           keyboardType="default"
//           autoCapitalize="sentences"
//           textContentType="none"
//         />
//       </View>

//       {/* Spara */}
//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Spara</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//   },
//   header: {
//     fontSize: 17,
//     fontWeight: "600",
//     color: "#4d7ee8ff", // blå
//     marginBottom: 16,
//   },
//   inputContainer: {
//     marginBottom: 12,
//   },
//   input: {
//     backgroundColor: "#fff",
//     padding: 12,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   textarea: {
//     height: 120,
//     textAlignVertical: "top",
//   },
//   results: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     marginTop: 8,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     maxHeight: 200,
//   },
//   resultItem: {
//     padding: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   button: {
//     backgroundColor: "#c7d2fe", // indigo-200
//     padding: 14,
//     borderRadius: 12,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#a5b4fc", // indigo-300
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#1e1b4b", // mörk indigo
//   },
// });

//NY kod:
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

import { addNewTask } from "../../backend/taskAPI";
import { displayError, displaySuccess } from "../../utils/toastService";
import useFetchWorkplaces from "../../hooks/useFetchWorkplaces";

export default function AddTask() {
  const router = useRouter();
  const {
    workplaces,
    loading: loadingWorkplaces,
    error,
  } = useFetchWorkplaces();

  const [task, setTask] = useState({
    title: "",
    address: "",
    coordinates: null,
    description: "",
  });

  const [filteredWorkplaces, setFilteredWorkplaces] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Sök bland arbetsplatser
  const handleSearch = (text) => {
    setTask((prev) => ({ ...prev, title: text }));

    if (text.trim().length > 0) {
      const results = workplaces.filter((wp) =>
        wp.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredWorkplaces(results);
      setShowResults(true);
    } else {
      setFilteredWorkplaces([]);
      setShowResults(false);
    }
  };

  // Beskrivning
  const handleDescriptionChange = (text) => {
    setTask((prev) => ({ ...prev, description: text }));
  };

  // Submit
  const handleSubmit = async () => {
    if (!task.title.trim()) {
      displayError("Välj en arbetsplats eller ange titel.");
      return;
    }
    if (!task.description.trim()) {
      displayError("Ange en beskrivning för uppdraget.");
      return;
    }
    if (!task.address) {
      displayError("Adress saknas för den valda arbetsplatsen.");
      return;
    }

    try {
      const newTask = {
        title: task.title,
        description: task.description,
        address: task.address,
        location: {
          type: "Point",
          coordinates: task.coordinates || [],
        },
      };

      await addNewTask(newTask);
      displaySuccess("Nytt uppdrag har skapats!");
      setTask({ title: "", address: "", coordinates: null, description: "" });
      setFilteredWorkplaces([]);
      setShowResults(false);
      router.back();
    } catch (err) {
      displayError(`Fel vid skapande av uppdrag: ${err.message}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Skapa morgonjobb</Text>

      {/* Sök efter arbetsplats */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Sök arbetsplats..."
          value={task.title}
          onChangeText={handleSearch}
        />
        {loadingWorkplaces && (
          <View style={styles.loading}>
            <ActivityIndicator size="small" color="#047857" />
            <Text>Laddar arbetsplatser...</Text>
          </View>
        )}

        {/* Autocomplete resultat */}
        {showResults && filteredWorkplaces.length > 0 && (
          <View style={styles.results}>
            {filteredWorkplaces.map((wp) => (
              <TouchableOpacity
                key={wp._id}
                style={styles.resultItem}
                onPress={() => {
                  setTask({
                    title: wp.name,
                    address: wp.address || "",
                    coordinates: wp.location?.coordinates || null,
                    description: "",
                  });
                  setShowResults(false);
                }}>
                <Text style={styles.resultTitle}>{wp.name}</Text>
                {wp.address && (
                  <Text style={styles.resultAddress}>{wp.address}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Visa vald adress */}
        {task.address ? (
          <Text style={styles.selectedAddress}>Adress: {task.address}</Text>
        ) : null}
      </View>

      {/* Beskrivning */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Beskriv uppdraget..."
          value={task.description}
          onChangeText={handleDescriptionChange}
          multiline
          numberOfLines={6}
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
    backgroundColor: "#F0FDF4",
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
    color: "#047857",
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
    position: "relative",
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
  resultTitle: {
    fontWeight: "600",
  },
  resultAddress: {
    fontSize: 12,
    color: "#555",
  },
  selectedAddress: {
    marginTop: 6,
    fontSize: 14,
    color: "#065F46",
  },
  button: {
    backgroundColor: "#34D399",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  loading: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
});
