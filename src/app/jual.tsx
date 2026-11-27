import { useState } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { addListing } from "../services/listingService";
import { Category } from "../types/product";

const categories: Category[] = ["buku", "elektronik", "pakaian", "perabot"];

export default function Jual() {
    const { user } = useAuth();
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [note, setNote] = useState<string>("");
    const [category, setCategory] = useState<Category>("buku");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSave = async () => {
        const cleanName = name.trim();
        const priceNumber = parseInt(price.trim(), 10);

        if (!cleanName) {
            Alert.alert("Gagal", "Nama barang wajib diisi.");
            return;
        }
        if (isNaN(priceNumber) || priceNumber <= 0) {
            Alert.alert("Gagal", "Harga harus berupa angka lebih dari 0.");
            return;
        }

        setLoading(true);
        try {
            await addListing({
                name: cleanName,
                price: priceNumber,
                category,
                note: note.trim() || undefined,
                seller_name: user?.user_metadata?.name ?? user?.email ?? "Mahasiswa",
            });
            Alert.alert("Berhasil", "Barang berhasil dijual.");
            router.back();
        } catch (err) {
            Alert.alert("Gagal", err instanceof Error ? err.message : "Terjadi kesalahan");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={s.container} contentContainerStyle={{ padding: 20 }}>
            <Text style={s.label}>Nama barang</Text>
            <TextInput style={s.input} value={name} onChangeText={setName} placeholder="Contoh: Kipas angin kos" />

            <Text style={s.label}>Harga (Rp)</Text>
            <TextInput
                style={s.input}
                value={price}
                onChangeText={setPrice}
                placeholder="Contoh: 50000"
                keyboardType="numeric"
            />

            <Text style={s.label}>Kategori</Text>
            <View style={s.chipRow}>
                {categories.map((cat) => (
                    <Pressable
                        key={cat}
                        style={[s.chip, category === cat && { backgroundColor: "#2563eb" }]}
                        onPress={() => setCategory(cat)}
                    >
                        <Text style={[s.chipText, category === cat && { color: "white" }]}>{cat}</Text>
                    </Pressable>
                ))}
            </View>

            <Text style={s.label}>Catatan (opsional)</Text>
            <TextInput
                style={[s.input, { height: 80, textAlignVertical: "top" }]}
                value={note}
                onChangeText={setNote}
                placeholder="Kondisi barang, alasan dijual, dan lain-lain"
                multiline
            />

            <Pressable style={[s.button, loading && { opacity: 0.6 }]} onPress={handleSave} disabled={loading}>
                {loading ? <ActivityIndicator color="white" /> : <Text style={s.buttonText}>Jual Barang</Text>}
            </Pressable>
        </ScrollView>
    );
}

const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f1f5f9" },
    label: { fontSize: 14, fontWeight: "bold", color: "#0f172a", marginBottom: 6 },
    input: {
        borderWidth: 1, borderColor: "#2563eb", backgroundColor: "white",
        padding: 10, borderRadius: 10, marginBottom: 14,
    },
    chipRow: { flexDirection: "row", flexWrap: "wrap", marginBottom: 14 },
    chip: { backgroundColor: "#e2e8f0", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16, marginRight: 8, marginBottom: 8 },
    chipText: { fontSize: 13, color: "#0f172a" },
    button: { backgroundColor: "#16a34a", padding: 14, borderRadius: 10, alignItems: "center", marginTop: 4 },
    buttonText: { color: "white", fontWeight: "bold", fontSize: 15 },
});