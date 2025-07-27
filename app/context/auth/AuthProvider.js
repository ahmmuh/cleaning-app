import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { getCurrentUser, signIn, testHandler } from "../../../backend/authApi";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";
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

  // const login = async (userData) => {
  //   try {
  //     const data = await signIn(userData);

  //     if (data.token) {
  //       await AsyncStorage.setItem("userToken", JSON.stringify(data));
  //       setUser(data);
  //       return true;
  //     } else {
  //       throw new Error("Ingen token mottagen");
  //     }
  //   } catch (error) {
  //     console.log("Fel vid inloggning", error);
  //     if (error.message === "Unauthorized") {
  //       router.push("/auth");
  //     }
  //     setError(error);
  //     return false;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
