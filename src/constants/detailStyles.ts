import { StyleSheet } from "react-native";

export const detailStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f1f5f9" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: { width: "100%", height: 260, backgroundColor: "#e2e8f0" },
  body: { padding: 16 },
  name: { fontSize: 22, fontWeight: "bold", color: "#0f172a" },
  price: { fontSize: 20, color: "#16a34a", marginVertical: 6 },
  seller: { fontSize: 14, color: "#64748b" },
  note: { fontSize: 14, color: "#334155", marginTop: 8 },
  favButton: { flexDirection: "row", alignItems: "center", marginTop: 16 },
  favText: { marginLeft: 8, fontSize: 14, color: "#0f172a" },
  contactButton: {
    backgroundColor: "#16a34a",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  backButton: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: { color: "white", fontWeight: "bold" },
});
