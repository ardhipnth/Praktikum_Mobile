import { Alert, Image, Pressable, Text, View } from "react-native";
import { styles } from "../constants/styles";
import { Product } from "../types/product";
import { formatRupiah } from "../utils/format";

export default function ProductCard({ item }: { item: Product }) {
    const imageUri = item.image ?? `https://picsum.photos/seed/${item.id}/200`;

    return (
        <View style={styles.card}>
            <Image source={{ uri: imageUri }} style={styles.cardImage} resizeMode="contain" />
            <View style={styles.cardInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{formatRupiah(item.price)}</Text>
                <Text style={styles.seller}>Penjual: {item.seller}</Text>

                <Text
                    style={{
                        alignSelf: "flex-start", fontSize: 11, paddingHorizontal: 8, paddingVertical: 2,
                        borderRadius: 8, marginTop: 4,
                        backgroundColor: item.category === "buku" ? "#dbeafe" : "#fef3c7",
                    }}
                >
                    {item.category}
                </Text>

                <Pressable
                    style={styles.buyButton}
                    onPress={() => Alert.alert("Hubungi Penjual", `Chat ${item.seller} tentang ${item.name}?`)}
                >
                    <Text style={styles.buyText}>Hubungi Penjual</Text>
                </Pressable>
            </View>
        </View>
    );
}