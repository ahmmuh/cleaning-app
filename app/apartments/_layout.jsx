import { Stack } from "expo-router";

const ApartmentLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "#bff38c",
        },
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitle: "Flyttstäd",
        headerShown: true,
      }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
        }}
      />
    </Stack>
  );
};

export default ApartmentLayout;
