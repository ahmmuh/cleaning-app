// import { router, useLocalSearchParams, useRouter } from "expo-router";
// import React, { useEffect, useState } from "react";
// import {
//   StyleSheet,
//   TextInput,
//   View,
//   ActivityIndicator,
//   Text,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import { getUnits } from "../../../../../backend/api";
// import {
//   displayError,
//   displaySuccess,
// } from "../../../../../utils/toastService";
// import { assignTaskToUnit, getTaskByID } from "../../../../../backend/taskAPI";

// function EditTask() {
//   //   const [contentHeight, setContentHeight] = useState(40); // För att hantera dynamisk höjd

//   const statusar = ["Ej påbörjat", "Påbörjat", "Färdigt"];
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { taskId } = useLocalSearchParams();

//   const [units, setUnits] = useState([]);
//   const [selectStatus, setSelectStatus] = useState("");
//   const [selectedUnit, setSelectedUnit] = useState("");

//   console.log("Task which will be updated", taskId);
//   // console.log("Unit which will be updated", unitId);

//   const [task, setTask] = useState({
//     title: "",
//     description: "",
//     location: "",
//     completed: "Ej påbörjat", // Startvärde för completed
//     unit: selectedUnit,
//   });
//   const fetchTask = async () => {
//     try {
//       const foundedTask = await getTaskByID(taskId);
//       if (!foundedTask) {
//         displayError("Denna task finns inte");
//         setLoading(false);
//         return;
//       }
//       console.log("Founded task", foundedTask);
//       setTask(foundedTask);
//       setLoading(false);
//     } catch (error) {
//       console.error(
//         "Error in navigating to edit task component via UnitId and taskId"
//       );
//       setError(error);
//       setLoading(false);
//     }
//   };

//   const fetchUnits = async () => {
//     try {
//       const unitList = await getUnits();
//       if (!unitList || unitList.length === 0) {
//         console.log("Det finns inga enheter i listan");
//         return;
//       }
//       console.log("Unit list", unitList);
//       setUnits(unitList);
//       setLoading(false);
//     } catch (error) {
//       displayError("Error vid hämtning av enheter");
//     }
//   };
//   useEffect(() => {
//     fetchUnits();
//   }, []);

//   useEffect(() => {
//     fetchTask();
//   }, [taskId]);

//   //update status

//   useEffect(() => {
//     if (!task.completed && selectStatus !== task.completed) {
//       setSelectStatus(task.completed);
//     }
//   }, [task.completed, selectStatus]);

//   //update unit (enheter)

//   useEffect(() => {
//     if (!task.selectedUnit) {
//       setSelectedUnit(task.selectedUnit);
//     }
//   }, [task.selectedUnit]);

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator color={"#007AFF"} size={"large"} />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>{error.message}</Text>
//       </View>
//     );
//   }

//   //   useEffect(() => {
//   //     setContentHeigh();
//   //   }, [contentHeight]);

//   //update the task

//   const handleSubmit = () => {
//     try {
//       const updatedTask = {
//         title: task.title,
//         description: task.description,
//         location: task.location,
//         completed: selectStatus,
//         unit: selectedUnit,
//       };
//       console.log("Updated", updatedTask);
//       assignTaskToUnit(taskId, updatedTask);
//       displaySuccess("Todo har uppdaterats");
//       router.push("/tasks");
//     } catch (error) {
//       console.log("Can not updated", error.message);
//       displayError("Det gick inte att uppdatera (todo)");
//     }
//   };
//   return (
//     <ScrollView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         <Text style={styles.statusTitle}>
//           Uppdatera status för {task.title}
//         </Text>
//         {task && (
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.textInput}
//               name="title"
//               value={task.title}
//               onChangeText={(text) =>
//                 setTask((prevTask) => ({
//                   ...prevTask,
//                   title: text,
//                 }))
//               }
//               placeholder="Task Title"
//             />
//             <TextInput
//               name="description"
//               style={[styles.textInput, styles.descriptionInput]}
//               value={task.description}
//               onChangeText={(text) =>
//                 setTask((prevTask) => ({
//                   ...prevTask,
//                   description: text,
//                 }))
//               }
//               placeholder="Description"
//               multiline
//             />
//             <TextInput
//               name="location"
//               style={styles.textInput}
//               value={task.location || ""}
//               onChangeText={(text) =>
//                 setTask((prevTask) => ({
//                   ...prevTask,
//                   location: text,
//                 }))
//               }
//               placeholder="Location"
//             />
//             <View style={styles.selectContainer}>
//               <View style={{ width: "100%" }}>
//                 <Text style={styles.statusTitle}>Välj Status</Text>
//               </View>
//               {task && (
//                 <Picker
//                   selectedValue={task.completed}
//                   onValueChange={setSelectStatus}
//                   onTouchCancel={true}
//                   style={styles.picker}>
//                   {statusar.map((status, index) => (
//                     <Picker.Item key={index} label={status} value={status} />
//                   ))}
//                 </Picker>
//               )}
//               <View style={{ width: "100%" }}>
//                 <Text style={styles.statusTitle}>Välj enhet</Text>
//               </View>
//               {task && (
//                 <Picker
//                   style={styles.picker}
//                   selectedValue={task.unit}
//                   onTouchCancel={true}
//                   onValueChange={setSelectedUnit}>
//                   {units.map((unit) => (
//                     <Picker.Item
//                       key={unit._id}
//                       label={unit.name}
//                       value={unit.name}
//                     />
//                   ))}
//                 </Picker>
//               )}
//             </View>
//             <TouchableOpacity
//               style={styles.updateButton}
//               onPress={handleSubmit}>
//               <Text style={styles.buttonTitle}>Uppdatera</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f7f7f7",
//     marginBottom: 20,
//   },
//   inputContainer: {
//     width: "100%",
//     alignItems: "center",
//   },
//   textInput: {
//     width: "100%",
//     height: 50,
//     marginBottom: 12,
//     paddingLeft: 15,
//     fontSize: 14,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 12,
//     backgroundColor: "#fff",
//     color: "#333",
//   },
//   updateButton: {
//     width: "100%",
//     height: 45,
//     marginVertical: 15,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 12,
//     backgroundColor: "#eed",
//   },
//   buttonTitle: {
//     color: "#222",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f7f7f7",
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f7f7f7",
//   },
//   errorText: {
//     color: "red",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   descriptionInput: {
//     minHeight: 80, // Minimumhöjd för description för att ge mer utrymme
//     height: Math.max(40), // Dynamisk höjd beroende på innehållet
//     textAlignVertical: "top", // Texten ska börja från toppen
//     paddingTop: 10, // Lite extra utrymme på toppen
//   },

//   //picker style

//   selectContainer: {
//     flex: 1,
//     justifyContent: "center",
//     // flexDirection: "column",
//     // padding: 20,
//     width: "100%",
//   },

//   picker: {
//     height: 50,
//     // backgroundColor: "#ded",
//     padding: 10,
//     width: "100%",
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: "#222",
//   },
//   statusTitle: {
//     fontSize: 15,
//     padding: 10,
//     color: "#222",
//     fontWeight: "bold",
//     borderWidth: 0.2,
//     borderColor: "#444",
//     width: "100%",
//     backgroundColor: "#eed",
//   },

//   taskTitle: {
//     color: "#666",
//     fontSize: 20,
//     fontWeight: "bold",
//   },
// });

// export default EditTask;

import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  displayError,
  displaySuccess,
} from "../../../../../utils/toastService";
import {
  assignTaskToUnit,
  getTaskByID,
  updateTaskById,
} from "../../../../../backend/taskAPI";

function EditTask() {
  const statusar = ["Ej påbörjat", "Påbörjat", "Färdigt"];
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { taskId } = useLocalSearchParams();

  const [selectStatus, setSelectStatus] = useState("");
  const [task, setTask] = useState({
    title: "",
    description: "",
    location: "",
    completed: "Ej påbörjat",
  });

  const fetchTask = async () => {
    try {
      const foundedTask = await getTaskByID(taskId);
      if (!foundedTask) {
        displayError("Denna task finns inte");
        setLoading(false);
        return;
      }
      setTask(foundedTask);
      setSelectStatus(foundedTask.completed);
      setLoading(false);
    } catch (error) {
      console.error("Fel vid hämtning av task");
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [taskId]);

  const handleSubmit = () => {
    try {
      const updatedTask = {
        title: task.title,
        description: task.description,
        location: task.location,
        completed: selectStatus,
      };
      updateTaskById(taskId, updatedTask);
      displaySuccess("Uppdrag har uppdaterats");
      router.push("/units");
    } catch (error) {
      console.log("Kan inte uppdatera", error.message);
      displayError("Det gick inte att uppdatera (todo)");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={"#007AFF"} size={"large"} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error.message}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.statusTitle}>
          Uppdatera status för {task.title}
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={task.title}
            onChangeText={(text) =>
              setTask((prevTask) => ({
                ...prevTask,
                title: text,
              }))
            }
            placeholder="Task Title"
          />
          <TextInput
            style={[styles.textInput, styles.descriptionInput]}
            value={task.description}
            onChangeText={(text) =>
              setTask((prevTask) => ({
                ...prevTask,
                description: text,
              }))
            }
            placeholder="Description"
            multiline
          />
          <TextInput
            style={styles.textInput}
            value={task.location || ""}
            onChangeText={(text) =>
              setTask((prevTask) => ({
                ...prevTask,
                location: text,
              }))
            }
            placeholder="Location"
          />
          <View style={styles.selectContainer}>
            <Text style={styles.statusTitle}>Välj Status</Text>
            <Picker
              selectedValue={selectStatus}
              onValueChange={setSelectStatus}
              style={styles.picker}>
              {statusar.map((status, index) => (
                <Picker.Item key={index} label={status} value={status} />
              ))}
            </Picker>
          </View>
          <TouchableOpacity style={styles.updateButton} onPress={handleSubmit}>
            <Text style={styles.buttonTitle}>Uppdatera</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
  textInput: {
    width: "100%",
    height: 50,
    marginBottom: 12,
    paddingLeft: 15,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    backgroundColor: "#fff",
    color: "#333",
  },
  updateButton: {
    width: "100%",
    height: 45,
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#eed",
  },
  buttonTitle: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  descriptionInput: {
    minHeight: 80,
    height: Math.max(40),
    textAlignVertical: "top",
    paddingTop: 10,
  },
  selectContainer: {
    width: "100%",
    justifyContent: "center",
  },
  picker: {
    height: 50,
    padding: 10,
    width: "100%",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#222",
  },
  statusTitle: {
    fontSize: 15,
    padding: 10,
    color: "#222",
    fontWeight: "bold",
    borderWidth: 0.2,
    borderColor: "#444",
    width: "100%",
    backgroundColor: "#eed",
  },
});

export default EditTask;
