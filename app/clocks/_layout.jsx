// app/clock/_layout.js
import { Stack } from "expo-router";

export default function ClockLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Stämpla In/Ut",
          headerStyle: {
            backgroundColor: "#bff38c",
          },
          headerTintColor: "#000",
        }}
      />
    </Stack>
  );
}
