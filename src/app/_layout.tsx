import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

function RootNavigator() {
  const { user, loading } = useAuth();
  const segments = useSegments();

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

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

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
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen
        name="index"
        options={{
          title: "Kampus Market",
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
              <Pressable onPress={() => router.push("/tentang")} hitSlop={8}>
                <Ionicons name="information-circle" size={26} color="white" />
              </Pressable>
              <Pressable onPress={() => router.push("/jual")} hitSlop={8}>
                <Ionicons name="add-circle-outline" size={26} color="white" />
              </Pressable>
              <Pressable onPress={handleLogout} hitSlop={8}>
                <Ionicons name="log-out-outline" size={24} color="white" />
              </Pressable>
            </View>
          ),
        }}
      />
      <Stack.Screen name="jual" options={{ title: "Jual Barang" }} />
      <Stack.Screen name="produk/[id]" options={{ title: "Detail Barang" }} />
      <Stack.Screen name="tentang" options={{ title: "Tentang Aplikasi" }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}