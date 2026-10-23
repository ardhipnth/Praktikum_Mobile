import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#2563eb" },
        headerTintColor: "white",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Kampus Market",
          headerRight: () => (
            <Link href="/tentang">
              <Ionicons name="information-circle" size={26} color="white" />
            </Link>
          ),
        }}
      />
      <Stack.Screen name="produk/[id]" options={{ title: "Detail Barang" }} />
      <Stack.Screen name="tentang" options={{ title: "Tentang Aplikasi" }} />
    </Stack>
  );
}