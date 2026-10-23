import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, TextInput, View } from "react-native";
import ProductCard from "../components/ProductCard";
import { styles } from "../constants/styles";
import { products } from "../data/products";
import { Category } from "../types/product";

const categories: Category[] = ["buku", "elektronik", "pakaian", "perabot"];

export default function Index() {
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect tanpa dependency: jalan sekali saat halaman pertama tampil
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // useEffect dengan dependency: jalan setiap search atau kategori berubah
  useEffect(() => {
    console.log(`Filter -> cari: "${search}", kategori: ${selectedCategory ?? "semua"}`);
  }, [search, selectedCategory]);

  const filteredProducts = products.filter((p) => {
    const matchName = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === null || p.category === selectedCategory;
    return matchName && matchCategory;
  });

  return (
    <View style={[styles.container, { paddingTop: 12 }]}>
      <Text style={styles.subtitle}>Jual beli barang bekas antar mahasiswa</Text>

      <TextInput
        placeholder="Cari barang..."
        style={styles.searchInput}
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.chipRow}>
        {categories.map((cat) => (
          <Pressable
            key={cat}
            style={[styles.chip, selectedCategory === cat && { backgroundColor: "#2563eb" }]}
            onPress={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
          >
            <Text style={[styles.chipText, selectedCategory === cat && { color: "white" }]}>
              {cat}
            </Text>
          </Pressable>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#2563eb" />
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text style={styles.subtitle}>Barang tidak ditemukan</Text>}
          renderItem={({ item }) => (
            <Pressable onPress={() => router.push(`/produk/${item.id}`)}>
              <ProductCard item={item} />
            </Pressable>
          )}
        />
      )}
    </View>
  );
}