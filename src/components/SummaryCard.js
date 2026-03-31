import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { formatRupiah } from "../utils/format";

export function SummaryCard({
  totalPemasukan,
  totalPengeluaran,
  jumlahTransaksi,
}) {
  const { colors } = useContext(ThemeContext);

  const items = [
    {
      label: "masuk",
      value: `+${formatRupiah(totalPemasukan, true)}`,
      icon: "🔥",
      color: colors.income,
    },
    {
      label: "keluar",
      value: `-${formatRupiah(totalPengeluaran, true)}`,
      icon: "🛍️",
      color: colors.expense,
    },
    {
      label: "transaksi",
      value: `${jumlahTransaksi} total`,
      icon: "📋",
      color: colors.primary,
    },
  ];

  return (
    <View style={[styles.row]}>
      {items.map((item) => (
        <View
          key={item.label}
          style={[
            styles.card,
            { backgroundColor: colors.card, shadowColor: colors.shadow },
          ]}
        >
          <Text style={styles.icon}>{item.icon}</Text>
          <Text style={[styles.value, { color: item.color }]}>
            {item.value}
          </Text>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
  card: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  icon: { fontSize: 22, marginBottom: 4 },
  value: { fontSize: 13, fontWeight: "700", marginBottom: 2 },
  label: { fontSize: 11 },
});
