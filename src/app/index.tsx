import { Ionicons } from "@expo/vector-icons";
import {
  Alert,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import ProductCard from "../components/ProductCard";
import { styles } from "../constants/styles";
import { products } from "../data/products";
import { Category } from "../types/product";
const categories: Category[] = ["buku", "elektronik", "pakaian", "perabot"];

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="storefront" size={28} color="#2563eb" />
        <Text style={styles.title}>Kampus Market</Text>
      </View>
      <Text style={styles.subtitle}>
        Jual beli barang bekas antar mahasiswa
      </Text>

      <TextInput placeholder="Cari barang..." style={styles.searchInput} />
      <View style={styles.chipRow}>
        {categories.map((cat) => (
          <Pressable
            key={cat}
            style={styles.chip}
            onPress={() => Alert.alert("Kategori", cat)}
          >
            <Text style={styles.chipText}>{cat}</Text>
          </Pressable>
        ))}
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard item={item} />}
      />
    </View>
  );
}
