import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, Alert } from "react-native";
import useAuth from "../context/auth/useAuth";
import { useRouter } from "expo-router";

function LoginScreen() {
  const router = useRouter();
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [logedUser, setUser] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    setLoading(true);
    console.log("USER DATA", user);
    // const { username, password } = logedUser;
    const success = await login(logedUser);
    // console.log("Inloggningsuppgifter i LoginScreen", {
    //   username: logedUser.username,
    //   password: logedUser.password,
    // });
    if (success) {
      console.log("Inloggning lyckades!");
      setLoading(false);
      router.push("/units");
    } else {
      Alert.alert("Fel", "Fel användarnamn eller lösenord");
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
          onChangeText={(text) => setUser({ ...logedUser, username: text })}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Lösenord"
          value={logedUser.password}
          onChangeText={(text) => setUser({ ...logedUser, password: text })}
          secureTextEntry
        />
        <View style={styles.buttonWrapper}>
          <Button
            title={loading ? "Loggar" : "Logga in"}
            disabled={loading}
            onPress={handleLogin}
          />
        </View>
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
  buttonWrapper: {
    width: "100%",
    marginTop: 10,
  },
});

export default LoginScreen;
