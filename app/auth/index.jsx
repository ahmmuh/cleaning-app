// // // import React, { useState } from "react";
// // // import { Button, StyleSheet, Text, TextInput, View, Alert } from "react-native";
// // // import useAuth from "../context/auth/useAuth";
// // // import { useRouter } from "expo-router";

// // // function LoginScreen() {
// // //   const router = useRouter();
// // //   const { user, login } = useAuth();
// // //   const [loading, setLoading] = useState(false);
// // //   const [logedUser, setUser] = useState({
// // //     username: "",
// // //     password: "",
// // //   });

// // //   const handleLogin = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const success = await login(logedUser);
// // //       if (success) {
// // //         console.log("Inloggning lyckades!");
// // //         router.push("/units");
// // //       } else {
// // //         setLoading(false);
// // //         Alert.alert("Fel", "Fel användarnamn eller lösenord");
// // //       }
// // //     } catch (err) {
// // //       console.error("Login error:", err);
// // //       setLoading(false);
// // //       Alert.alert("Ett fel uppstod", "Försök igen senare");
// // //     }
// // //   };

// // //   // const handleLogin = async () => {
// // //   //   setLoading(true);

// // //   //   try {
// // //   //     const success = await login(logedUser);
// // //   //     if (success) {
// // //   //       console.log("Inloggning lyckades!");
// // //   //       setLoading(false);
// // //   //       router.push("/units");
// // //   //     } else {
// // //   //       Alert.alert("Fel", "Fel användarnamn eller lösenord");
// // //   //     }
// // //   //   } finally {
// // //   //     setLoading(false);
// // //   //   }
// // //   // };

// // //   return (
// // //     <View style={styles.container}>
// // //       <View style={styles.formContainer}>
// // //         <Text style={styles.welcomeText}>Vänligen logga in</Text>
// // //         <TextInput
// // //           style={styles.textInput}
// // //           placeholder="Användarnamn"
// // //           value={logedUser.username}
// // //           onChangeText={(text) => setUser({ ...logedUser, username: text })}
// // //           autoCapitalize="none"
// // //         />
// // //         <TextInput
// // //           style={styles.textInput}
// // //           placeholder="Lösenord"
// // //           value={logedUser.password}
// // //           onChangeText={(text) => setUser({ ...logedUser, password: text })}
// // //           secureTextEntry
// // //         />
// // //         <View style={styles.buttonWrapper}>
// // //           <Button
// // //             title={loading ? "Loggar" : "Logga in"}
// // //             disabled={loading}
// // //             onPress={handleLogin}
// // //           />
// // //         </View>
// // //       </View>
// // //     </View>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: "#bdcbbb",
// // //     padding: 20,
// // //   },

// // //   welcomeText: {
// // //     fontSize: 26,
// // //     fontWeight: "bold",
// // //     marginBottom: 40,
// // //   },
// // //   formContainer: {
// // //     flex: 1,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //   },
// // //   textInput: {
// // //     height: 40,
// // //     borderColor: "#000",
// // //     borderWidth: 1,
// // //     borderRadius: 10,
// // //     paddingHorizontal: 10,
// // //     marginBottom: 15,
// // //     backgroundColor: "#fff",
// // //     width: "100%",
// // //   },
// // //   buttonWrapper: {
// // //     width: "100%",
// // //     marginTop: 10,
// // //   },
// // // });

// // // export default LoginScreen;

// // import React, { useState } from "react";
// // import { Button, StyleSheet, Text, TextInput, View } from "react-native";
// // import useAuth from "../context/auth/useAuth";
// // import { useRouter } from "expo-router";

// // function LoginScreen() {
// //   const router = useRouter();
// //   const { login } = useAuth();
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [logedUser, setUser] = useState({
// //     username: "",
// //     password: "",
// //   });

// //   const handleLogin = async () => {
// //     setError(""); // rensa gammalt fel
// //     setLoading(true);

// //     try {
// //       const success = await login(logedUser);
// //       if (success) {
// //         console.log("Inloggning lyckades!");
// //         router.push("/units");
// //       } else {
// //         setError("Fel användarnamn eller lösenord");
// //       }
// //     } catch (err) {
// //       console.error("Login error:", err);
// //       setError("Ett fel uppstod, försök igen senare");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.formContainer}>
// //         <Text style={styles.welcomeText}>Vänligen logga in</Text>

// //         <TextInput
// //           style={styles.textInput}
// //           placeholder="Användarnamn"
// //           value={logedUser.username}
// //           onChangeText={(text) => setUser({ ...logedUser, username: text })}
// //           autoCapitalize="none"
// //         />

// //         <TextInput
// //           style={styles.textInput}
// //           placeholder="Lösenord"
// //           value={logedUser.password}
// //           onChangeText={(text) => setUser({ ...logedUser, password: text })}
// //           secureTextEntry
// //         />

// //         {error ? <Text style={styles.errorText}>{error}</Text> : null}

// //         <View style={styles.buttonWrapper}>
// //           <Button
// //             title={loading ? "Loggar in..." : "Logga in"}
// //             disabled={loading} // bara disabled medan request pågår
// //             onPress={handleLogin}
// //           />
// //         </View>
// //       </View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#bdcbbb",
// //     padding: 20,
// //   },
// //   welcomeText: {
// //     fontSize: 26,
// //     fontWeight: "bold",
// //     marginBottom: 40,
// //   },
// //   formContainer: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   textInput: {
// //     height: 40,
// //     borderColor: "#000",
// //     borderWidth: 1,
// //     borderRadius: 10,
// //     paddingHorizontal: 10,
// //     marginBottom: 15,
// //     backgroundColor: "#fff",
// //     width: "100%",
// //   },
// //   errorText: {
// //     color: "red",
// //     marginBottom: 10,
// //   },
// //   buttonWrapper: {
// //     width: "100%",
// //     marginTop: 10,
// //   },
// // });

// // export default LoginScreen;

// import React, { useState } from "react";
// import { Button, StyleSheet, Text, TextInput, View } from "react-native";
// import useAuth from "../context/auth/useAuth";
// import { useRouter } from "expo-router";

// function LoginScreen() {
//   const router = useRouter();
//   const { login } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [logedUser, setUser] = useState({
//     username: "",
//     password: "",
//   });

//   const handleLogin = async () => {
//     setError("");
//     setLoading(true);

//     try {
//       const success = await login(logedUser);
//       if (success) {
//         router.push("/");
//       } else {
//         setError("Fel användarnamn eller lösenord");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("⚠️ Ett tekniskt fel uppstod, försök igen senare");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.formContainer}>
//         <Text style={styles.welcomeText}>Vänligen logga in</Text>

//         <TextInput
//           style={styles.textInput}
//           placeholder="Användarnamn"
//           value={logedUser.username}
//           onChangeText={(text) => {
//             setUser({ ...logedUser, username: text });
//             setError(""); // ta bort fel direkt när användaren skriver igen
//           }}
//           autoCapitalize="none"
//         />

//         <TextInput
//           style={styles.textInput}
//           placeholder="Lösenord"
//           value={logedUser.password}
//           onChangeText={(text) => {
//             setUser({ ...logedUser, password: text });
//             setError(""); // ta bort fel direkt när användaren skriver igen
//           }}
//           secureTextEntry
//         />

//         {error ? <Text style={styles.errorText}>{error}</Text> : null}

//         <View style={styles.buttonWrapper}>
//           <Button
//             title={loading ? "Loggar in..." : "Logga in"}
//             onPress={handleLogin}
//           />
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#bdcbbb",
//     padding: 20,
//   },
//   welcomeText: {
//     fontSize: 26,
//     fontWeight: "bold",
//     marginBottom: 40,
//   },
//   formContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   textInput: {
//     height: 40,
//     borderColor: "#000",
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     marginBottom: 15,
//     backgroundColor: "#fff",
//     width: "100%",
//   },
//   errorText: {
//     color: "red",
//     fontSize: 10,
//     marginBottom: 10,
//   },
//   buttonWrapper: {
//     width: "100%",
//     marginTop: 10,
//   },
// });

// export default LoginScreen;

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import useAuth from "../context/auth/useAuth";
import { useRouter } from "expo-router";

function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [logedUser, setUser] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    setError("");

    try {
      const success = await login(logedUser);
      if (success) {
        router.push("/");
      } else {
        setError("❌ Fel användarnamn eller lösenord");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("⚠️ Ett tekniskt fel uppstod, försök igen senare");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.welcomeText}>Vänligen logga in</Text>

        <TextInput
          style={styles.textInput}
          placeholder="Användarnamn"
          value={logedUser.username}
          onChangeText={(text) => {
            setUser({ ...logedUser, username: text });
            setError("");
          }}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.textInput}
          placeholder="Lösenord"
          value={logedUser.password}
          onChangeText={(text) => {
            setUser({ ...logedUser, password: text });
            setError("");
          }}
          secureTextEntry
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Logga in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bdcbbb",
    padding: 20,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 40,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    width: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#5AA9FA", // samma blå som iOS standard
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;
