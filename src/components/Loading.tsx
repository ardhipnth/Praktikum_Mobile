import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Loading({ message = "Memuat..." }: { message?: string }) {
    return (
        <View style={s.container}>
            <ActivityIndicator size="large" color="#2563eb" />
            <Text style={s.text}>{message}</Text>
        </View>
    );
}

const s = StyleSheet.create({
    container: { padding: 24, alignItems: "center" },
    text: { marginTop: 8, color: "#64748b" },
});