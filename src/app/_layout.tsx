import { Ionicons } from "@expo/vector-icons";
import { Link, router, Stack, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { AuthProvider, useAuth } from "../context/AuthContext"; // BARU
import { supabase } from "../lib/supabase"; // BARU

// BARU: isi layout dipindah ke fungsi ini agar bisa memakai useAuth()
function RootNavigator() {
  const { user, loading } = useAuth();
  const segments = useSegments();

  // BARU: route guard
  useEffect(() => {
    if (loading) {
      return;
    }
    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (user && inAuthGroup) {
      router.replace("/");
    }
  }, [user, loading, segments]);

  // BARU: spinner selama sesi dicek
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  // BARU: keluar
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#2563eb" },
        headerTintColor: "white",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {/* BARU */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen
        name="index"
        options={{
          title: "Kampus Market",
          headerRight: () => (
            // BARU: dibungkus View agar ada dua ikon (info dan keluar)
            <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
              <Link href="/tentang">
                <Ionicons name="information-circle" size={26} color="white" />
              </Link>
              <Pressable onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={24} color="white" />
              </Pressable>
            </View>
          ),
        }}
      />
      <Stack.Screen name="produk/[id]" options={{ title: "Detail Barang" }} />
      <Stack.Screen name="tentang" options={{ title: "Tentang Aplikasi" }} />
    </Stack>
  );
}

// BARU: AuthProvider membungkus seluruh navigasi
export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}