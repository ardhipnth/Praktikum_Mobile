import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import { styles } from "../constants/styles";
import { getAllProducts } from "../services/productService";
import { Category, Product } from "../types/product";

const categories: Category[] = ["buku", "elektronik", "pakaian", "perabot"];

export default function Index() {
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState<number>(0);

  // Ambil data dari API setiap halaman dibuka, atau setiap reloadKey berubah (tombol "Coba Lagi")
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllProducts();
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [reloadKey]);

  useEffect(() => {
    console.log(`Filter -> cari: "${search}", kategori: ${selectedCategory ?? "semua"}`);
  }, [search, selectedCategory]);

  const filteredProducts = items.filter((p) => {
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
        <Loading message="Mengambil barang..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={() => setReloadKey(reloadKey + 1)} />
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