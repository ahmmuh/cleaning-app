import React, { useState } from "react";
import AuthContext from "./AuthContext";
import { signIn } from "../../../backend/authApi";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const login = async (userData) => {
    try {
      const data = await signIn(userData);
      setUser(data);
    } catch (error) {
      console.log("Error vid inloggning", error);
      setError(error);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
