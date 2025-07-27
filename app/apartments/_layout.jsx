import { Stack } from "expo-router";

const ApartmentLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#003366",
        headerStyle: {
          backgroundColor: "#bff38c",
        },
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitle: "Flyttstäd",
        headerShown: true,
      }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default ApartmentLayout;
