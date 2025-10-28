import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import useFetchCurrentUser from "../../../hooks/useFetchCurrentUser";
import { logout } from "../../../backend/authApi";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, loading } = useFetchCurrentUser();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/auth");
    } catch (error) {
      Alert.alert("Fel vid logout", error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Laddar användardata...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.centerContainer}>
        <Text>Användardata kunde inte hämtas</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Min Profil</Text>

      <View style={styles.card}>
        <Text style={styles.labelTitle}>Namn:</Text>
        <Text style={styles.label}>{user.name}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.labelTitle}>Email:</Text>
        <Text style={styles.label}>{user.email}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.labelTitle}>Roll:</Text>
        <Text style={styles.label}>{user.role.join(", ")}</Text>
      </View>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logga ut</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#003366",
    textAlign: "left", // ändrat från center till left
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  labelTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  label: {
    fontSize: 18,
    color: "#000",
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: "#ff4d4d",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
