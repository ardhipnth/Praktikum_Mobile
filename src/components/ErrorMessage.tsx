import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = { message: string; onRetry?: () => void };

export default function ErrorMessage({ message, onRetry }: Props) {
    return (
        <View style={s.container}>
            <Text style={s.text}>{message}</Text>
            {onRetry && (
                <Pressable style={s.button} onPress={onRetry}>
                    <Text style={s.buttonText}>Coba Lagi</Text>
                </Pressable>
            )}
        </View>
    );
}

const s = StyleSheet.create({
    container: { padding: 24, alignItems: "center" },
    text: { color: "#dc2626", textAlign: "center", marginBottom: 12 },
    button: { backgroundColor: "#2563eb", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
    buttonText: { color: "white", fontWeight: "bold" },
});