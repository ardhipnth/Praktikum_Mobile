import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { supabase } from "../../lib/supabase";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleAuth = async () => {
        const cleanEmail = email.trim();   // buang spasi tak terlihat dari keyboard
        const cleanName = name.trim();

        if (!cleanEmail || !password || (isRegistering && !cleanName)) {
            Alert.alert("Data belum lengkap", "Isi semua kolom yang diperlukan.");
            return;
        }
        if (password.length < 6) {
            Alert.alert("Kata sandi terlalu pendek", "Minimal 6 karakter.");
            return;
        }

        setLoading(true);
        try {
            if (isRegistering) {
                const { data, error } = await supabase.auth.signUp({
                    email: cleanEmail,
                    password,
                    options: { data: { name: cleanName, role: "mahasiswa" } }, // metadata
                });
                if (error) throw error;

                if (!data.session) {
                    // Konfirmasi email aktif: belum bisa masuk sebelum verifikasi
                    Alert.alert("Cek email", "Kami mengirim tautan verifikasi ke emailmu.");
                    setIsRegistering(false);
                }
                // Kalau session ada, pengguna otomatis masuk dan diarahkan oleh route guard
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email: cleanEmail,
                    password,
                });
                if (error) throw error;
                // Pengalihan ke beranda ditangani route guard
            }
        } catch (err) {
            Alert.alert("Gagal", err instanceof Error ? err.message : "Terjadi kesalahan");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={s.container}>
            <Ionicons name="storefront" size={56} color="#2563eb" />
            <Text style={s.title}>Kampus Market</Text>
            <Text style={s.subtitle}>{isRegistering ? "Buat akun baru" : "Masuk ke akunmu"}</Text>

            {isRegistering && (
                <TextInput
                    placeholder="Nama panggilan"
                    style={s.input}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                />
            )}
            <TextInput
                placeholder="Email"
                style={s.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TextInput
                placeholder="Kata sandi (min. 6 karakter)"
                style={s.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
            />

            <Pressable
                style={[s.button, loading && { opacity: 0.6 }]}
                onPress={handleAuth}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text style={s.buttonText}>{isRegistering ? "Daftar" : "Masuk"}</Text>
                )}
            </Pressable>

            <Pressable onPress={() => setIsRegistering(!isRegistering)} disabled={loading}>
                <Text style={s.toggle}>
                    {isRegistering ? "Sudah punya akun? Masuk di sini" : "Belum punya akun? Daftar di sini"}
                </Text>
            </Pressable>
        </View>
    );
}

const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f1f5f9", padding: 24, justifyContent: "center" },
    title: { fontSize: 26, fontWeight: "bold", color: "#0f172a", marginTop: 8 },
    subtitle: { fontSize: 15, color: "#64748b", marginBottom: 20 },
    input: {
        borderWidth: 1, borderColor: "#2563eb", backgroundColor: "white",
        padding: 12, borderRadius: 10, marginBottom: 12,
    },
    button: { backgroundColor: "#2563eb", padding: 14, borderRadius: 10, alignItems: "center", marginTop: 4 },
    buttonText: { color: "white", fontWeight: "bold", fontSize: 15 },
    toggle: { color: "#2563eb", textAlign: "center", marginTop: 16 },
});