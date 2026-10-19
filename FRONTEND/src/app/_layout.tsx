import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#050505",
        },
      }}
    >
      <Stack.Screen
        name="master"
        options={{ animation: "none" }}
      />

      <Stack.Screen
        name="inicio"
        options={{ animation: "none" }}
      />

      <Stack.Screen
        name="explorar"
        options={{ animation: "none" }}
      />

      <Stack.Screen
        name="ofertas"
        options={{ animation: "none" }}
      />

      <Stack.Screen
        name="reservar"
        options={{ animation: "none" }}
      />
    </Stack>
  );
}