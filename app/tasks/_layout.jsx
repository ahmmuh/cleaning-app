import { Stack } from "expo-router";

const TaskLayout = () => {
  const date = new Date().toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return (
    <Stack
      screenOptions={{
        tabBarActiveTintColor: "#003366",
        headerStyle: {
          backgroundColor: "#bff38c",
        },
        headerTitleStyle: { fontWeight: "bold", fontSize: 16 },
      }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: `Alla morgonjobb för ${date}`,
        }}
      />
    </Stack>
  );
};

export default TaskLayout;
