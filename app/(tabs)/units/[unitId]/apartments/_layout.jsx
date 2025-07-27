const { Stack } = require("expo-router");

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
      }}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Flyttstäd",
          headerShown: true,
        }}
      />
    </Stack>
  );
};

export default ApartmentLayout;
