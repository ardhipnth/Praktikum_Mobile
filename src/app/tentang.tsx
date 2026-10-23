import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Tentang() {
    return (
        <View style={s.container}>
            <Text style={s.title}>Kampus Market</Text>
            <Text style={s.desc}>
                Aplikasi jual beli barang bekas antar mahasiswa. Dibuat untuk Praktikum Pemrograman Mobile.
            </Text>
            <Pressable style={s.button} onPress={() => router.back()}>
                <Text style={s.buttonText}>Kembali</Text>
            </Pressable>
        </View>
    );
}

const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f1f5f9", padding: 20, justifyContent: "center" },
    title: { fontSize: 24, fontWeight: "bold", color: "#0f172a", marginBottom: 8 },
    desc: { fontSize: 15, color: "#64748b", marginBottom: 20 },
    button: { backgroundColor: "#2563eb", padding: 12, borderRadius: 10, alignItems: "center" },
    buttonText: { color: "white", fontWeight: "bold" },
});