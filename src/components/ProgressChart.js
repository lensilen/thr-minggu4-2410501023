import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { formatRupiah } from "../utils/format";

export function ProgressChart({ summary }) {
  const { colors } = useContext(ThemeContext);
  const { totalPemasukan, totalPengeluaran, saldo, persenHemat } = summary;

  const pct =
    totalPemasukan > 0
      ? Math.min((totalPengeluaran / totalPemasukan) * 100, 100)
      : 0;

  const bars = [
    {
      label: "Total Pemasukan",
      amount: totalPemasukan,
      color: colors.income,
      pct: 100,
    },
    {
      label: "Total Pengeluaran",
      amount: totalPengeluaran,
      color: colors.expense,
      pct,
    },
    {
      label: "Sisa / Tabungan",
      amount: saldo,
      color: colors.saving,
      pct: 100 - pct,
    },
  ];

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.card, shadowColor: colors.shadow },
      ]}
    >
      <Text style={[styles.title, { color: colors.text }]}>
        📊 Ringkasan THR
      </Text>
      <Text style={[styles.sub, { color: colors.textSecondary }]}>
        Kamu berhasil hemat {persenHemat}% dari total pemasukan
      </Text>

      {bars.map((bar) => (
        <View key={bar.label} style={styles.barRow}>
          <View style={styles.barLabel}>
            <Text style={[styles.barText, { color: colors.textSecondary }]}>
              {bar.label}
            </Text>
            <Text style={[styles.barAmount, { color: colors.text }]}>
              {formatRupiah(bar.amount)}
            </Text>
          </View>
          <View style={[styles.track, { backgroundColor: colors.border }]}>
            <View
              style={[
                styles.fill,
                { width: `${bar.pct}%`, backgroundColor: bar.color },
              ]}
            />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  title: { fontSize: 16, fontWeight: "700", marginBottom: 4 },
  sub: { fontSize: 12, marginBottom: 16 },
  barRow: { marginBottom: 12 },
  barLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  barText: { fontSize: 12 },
  barAmount: { fontSize: 12, fontWeight: "600" },
  track: { height: 8, borderRadius: 4, overflow: "hidden" },
  fill: { height: 8, borderRadius: 4 },
});
