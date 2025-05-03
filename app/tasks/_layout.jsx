import { Stack } from "expo-router";

const TaskLayout = () => {
  return (
    <Stack
      screenOptions={{
        tabBarActiveTintColor: "#003366",
        headerStyle: {
          backgroundColor: "#bff38c",
        },

        headerTitleStyle: "bold",
      }}>
      <Stack.Screen name="tasks" />
    </Stack>
  );
};
