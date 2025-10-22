// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   TouchableOpacity,
// } from "react-native";
// import useAuth from "../context/auth/useAuth";
// import { useRouter } from "expo-router";

// function LoginScreen() {
//   const router = useRouter();
//   const { login } = useAuth();
//   const [error, setError] = useState("");
//   const [logedUser, setUser] = useState({
//     username: "",
//     password: "",
//   });

//   const handleLogin = async () => {
//     setError("");

//     try {
//       const success = await login(logedUser);
//       if (success) {
//         router.push("/");
//       } else {
//         setError("❌ Fel användarnamn eller lösenord");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("⚠️ Ett tekniskt fel uppstod, försök igen senare");
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
//             setError("");
//           }}
//           autoCapitalize="none"
//         />

//         <TextInput
//           style={styles.textInput}
//           placeholder="Lösenord"
//           value={logedUser.password}
//           onChangeText={(text) => {
//             setUser({ ...logedUser, password: text });
//             setError("");
//           }}
//           secureTextEntry
//         />

//         {error ? <Text style={styles.errorText}>{error}</Text> : null}

//         <TouchableOpacity style={styles.button} onPress={handleLogin}>
//           <Text style={styles.buttonText}>Logga in</Text>
//         </TouchableOpacity>
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
//     fontSize: 12,
//     marginBottom: 10,
//   },
//   button: {
//     backgroundColor: "#5AA9FA", // samma blå som iOS standard
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     alignItems: "center",
//     width: "100%",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default LoginScreen;

//Ny kod efter ändring:
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Välkommen!</Text>
        <Text style={styles.subText}>Logga in för att fortsätta</Text>
      </View>

      <View style={styles.formContainer}>
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f7",
    padding: 20,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1b3a57",
  },
  subText: {
    fontSize: 16,
    color: "#617481",
    marginTop: 6,
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  textInput: {
    height: 50,
    borderColor: "#d0d7de",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#f9fafb",
    fontSize: 16,
    color: "#1b3a57",
  },
  errorText: {
    color: "#d9534f",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#1b3a57",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginScreen;
