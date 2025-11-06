import { Stack } from "expo-router";

const ApartmentLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "#5381b1ff",
        },
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitle: "Flyttstäd",
        headerTintColor: "#fff",
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
