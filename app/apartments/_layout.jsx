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

        headerTitleStyle: "bold",
        title: "",
      }}>
      <Stack.Screen
              name="index"
              
        options={{
          headerTitle: "Flytstäd",
          headerShown: true,
        }}
      />
    </Stack>
  );
};

export default ApartmentLayout;
