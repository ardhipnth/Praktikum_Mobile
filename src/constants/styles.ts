import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f1f5f9", paddingTop: 50, paddingHorizontal: 16 },
    header: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
    title: { fontSize: 24, fontWeight: "bold", color: "#0f172a", marginLeft: 8 },
    subtitle: { fontSize: 14, color: "#64748b", marginBottom: 12 },
    searchInput: {
        borderWidth: 1, borderColor: "#2563eb", backgroundColor: "white",
        padding: 10, borderRadius: 10, marginBottom: 12,
    },
    chipRow: { flexDirection: "row", marginBottom: 12 },
    chip: { backgroundColor: "#e2e8f0", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16, marginRight: 8 },
    chipText: { fontSize: 13, color: "#0f172a" },
    card: {
        flexDirection: "row", backgroundColor: "white", borderRadius: 16,
        padding: 12, marginBottom: 12, elevation: 3, shadowColor: "#000",
    },
    cardImage: { width: 90, height: 90, borderRadius: 12 },
    cardInfo: { flex: 1, marginLeft: 12 },
    productName: { fontSize: 16, fontWeight: "bold", color: "#0f172a" },
    productPrice: { fontSize: 15, color: "#16a34a", marginVertical: 2 },
    seller: { fontSize: 12, color: "#64748b" },
    buyButton: { backgroundColor: "#2563eb", borderRadius: 8, paddingVertical: 6, marginTop: 8, alignItems: "center" },
    buyText: { color: "white", fontWeight: "bold", fontSize: 13 },
});