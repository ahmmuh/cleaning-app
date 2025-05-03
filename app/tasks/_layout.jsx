import { Stack } from "expo-router";

const TaskLayout = () => {
  return (
    <Stack
      screenOptions={{
        tabBarActiveTintColor: "#003366",
        headerStyle: {
          backgroundColor: "#bff38c",
        },
        headerTitleStyle: { fontWeight: "bold" },
      }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "Todo lista",
        }}
      />
    </Stack>
  );
};

export default TaskLayout;
