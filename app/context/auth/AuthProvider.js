import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { getCurrentUser, signIn, testHandler } from "../../../backend/authApi";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";
import NotificationScreen from "../../expo-notifications";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        if (!userToken) return;
        setUser(JSON.parse(userToken));
        console.log("USER TOKEN I AUTHPROVIDER", userToken);
      } catch (error) {
        console.log("Fel vid inloggning");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (userData) => {
    try {
      const data = await signIn(userData);

      if (data.user) {
        setUser(data.user);
        const currentUser = await getCurrentUser();
        console.log("Inloggade användare", currentUser);
        return true;
      } else {
        throw new Error("Ingen användardata mottagen");
      }
    } catch (error) {
      console.log("Fel vid inloggning", error);
      if (error.message === "Unauthorized") {
        router.push("/auth");
      }
      setError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("userToken");
    setUser(null);
  };
  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator size={30} color={"green"} />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {/* {user && <NotificationScreen />} */}

      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;

// //NY KOD:

// import React, { useEffect, useState } from "react";
// import AuthContext from "./AuthContext";
// import { getCurrentUser, signIn } from "../../../backend/authApi";
// import { useRouter } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { ActivityIndicator, View } from "react-native";
// // import NotificationScreen from "../../expo-notifications";

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   // 🟢 Vid appstart: hämta token från AsyncStorage
//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         const savedToken = await AsyncStorage.getItem("userToken");
//         if (savedToken) {
//           // 🔹 Här kan du verifiera token eller hämta aktuell användare
//           const currentUser = await getCurrentUser(savedToken);
//           if (currentUser) {
//             setUser(currentUser);
//             console.log("✅ Laddade användare från AsyncStorage:", currentUser);
//           }
//         }
//       } catch (error) {
//         console.log("⚠️ Fel vid laddning av användare:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadUser();
//   }, []);

//   // 🟢 Login och spara token
//   const login = async (userData) => {
//     setLoading(true);
//     try {
//       const data = await signIn(userData);

//       if (data?.token) {
//         // Spara token i AsyncStorage
//         await AsyncStorage.setItem("userToken", data.token);

//         // Hämta användarinfo baserat på token
//         const currentUser = await getCurrentUser(data.token);
//         setUser(currentUser);

//         console.log("🔐 Inloggad användare:", currentUser);
//         return true;
//       } else {
//         throw new Error("Ingen token mottagen");
//       }
//     } catch (error) {
//       console.log("❌ Fel vid inloggning:", error);
//       setError(error);
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔴 Logout
//   const logout = async () => {
//     await AsyncStorage.removeItem("userToken");
//     setUser(null);
//     router.replace("/auth"); // navigera till login
//   };

//   if (loading) {
//     return (
//       <View
//         style={{
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//         }}>
//         <ActivityIndicator size={30} color={"green"} />
//       </View>
//     );
//   }

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout, error }}>
//       {/* {user && <NotificationScreen />} */}
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
