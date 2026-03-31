import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export function EmptyState({ message = "Belum ada transaksi nih~" }) {
  const { colors } = useContext(ThemeContext);
  return (
    <View style={styles.wrap}>
      <Text style={styles.emoji}>🌙</Text>
      <Text style={[styles.text, { color: colors.textSecondary }]}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center", paddingVertical: 40 },
  emoji: { fontSize: 48, marginBottom: 12 },
  text: { fontSize: 14 },
});
