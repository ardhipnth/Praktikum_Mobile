import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";
import { detailStyles } from "../../constants/detailStyles";
import { formatRupiah } from "../../utils/format";
import { getProductById } from "../../utils/products";

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const product = getProductById(id);

  // Kembali dengan aman: kalau tidak ada halaman sebelumnya, ganti ke halaman utama
  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  if (!product) {
    return (
      <View style={detailStyles.center}>
        <Text style={detailStyles.name}>Barang tidak ditemukan</Text>
        <Pressable style={detailStyles.backButton} onPress={goBack}>
          <Text style={detailStyles.buttonText}>Kembali</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={detailStyles.container}>
      <Image
        source={{
          uri: product.image ?? `https://picsum.photos/seed/${product.id}/400`,
        }}
        style={detailStyles.image}
        resizeMode="contain"
      />
      <View style={detailStyles.body}>
        <Text style={detailStyles.name}>{product.name}</Text>
        <Text style={detailStyles.price}>{formatRupiah(product.price)}</Text>
        <Text style={detailStyles.seller}>Penjual: {product.seller}</Text>
        {product.note && (
          <Text style={detailStyles.note}>Catatan: {product.note}</Text>
        )}

        <Pressable
          style={detailStyles.favButton}
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={28}
            color={isFavorite ? "red" : "gray"}
          />
          <Text style={detailStyles.favText}>
            {isFavorite ? "Disimpan di favorit" : "Simpan ke favorit"}
          </Text>
        </Pressable>

        <Pressable
          style={detailStyles.contactButton}
          onPress={() =>
            Alert.alert(
              "Hubungi Penjual",
              `Chat ${product.seller} tentang ${product.name}?`,
            )
          }
        >
          <Text style={detailStyles.buttonText}>Hubungi Penjual</Text>
        </Pressable>

        <Pressable style={detailStyles.backButton} onPress={goBack}>
          <Text style={detailStyles.buttonText}>Kembali</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
