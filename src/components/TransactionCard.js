import { useContext } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getCategoryById } from "../constants/categories";
import { ThemeContext } from "../context/ThemeContext";
import { useTHR } from "../hooks/useTHR";
import { ACTIONS } from "../reducers/thrReducer";
import { formatDate, formatRupiah } from "../utils/format";

export function TransactionCard({ transaction }) {
  const { colors } = useContext(ThemeContext);
  const { dispatch } = useTHR();
  const cat = getCategoryById(transaction.category);
  const isIncome = transaction.type === "pemasukan";

  const handleDelete = () => {
    Alert.alert(
      "Hapus Transaksi",
      `Yakin hapus "${transaction.note || cat.label}"?`,
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: () =>
            dispatch({
              type: ACTIONS.DELETE_TRANSACTION,
              payload: transaction.id,
            }),
        },
      ],
    );
  };

  return (
    <TouchableOpacity
      onLongPress={handleDelete}
      style={[
        styles.card,
        { backgroundColor: colors.card, shadowColor: colors.shadow },
      ]}
      activeOpacity={0.85}
    >
      <View style={[styles.iconBox, { backgroundColor: cat.color + "20" }]}>
        <Text style={styles.icon}>{cat.icon}</Text>
      </View>

      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {transaction.note || cat.label}
        </Text>
        <Text style={[styles.sub, { color: colors.textSecondary }]}>
          {formatDate(transaction.date)} · dari: {cat.label}
        </Text>
        <View style={[styles.badge, { backgroundColor: cat.color + "20" }]}>
          <Text style={[styles.badgeText, { color: cat.color }]}>
            {cat.label}
          </Text>
        </View>
      </View>

      <Text
        style={[
          styles.amount,
          { color: isIncome ? colors.income : colors.expense },
        ]}
      >
        {isIncome ? "+" : "-"}
        {formatRupiah(transaction.amount)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  icon: { fontSize: 22 },
  info: { flex: 1 },
  title: { fontSize: 14, fontWeight: "600", marginBottom: 2 },
  sub: { fontSize: 11, marginBottom: 4 },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  badgeText: { fontSize: 10, fontWeight: "600" },
  amount: { fontSize: 14, fontWeight: "700", marginLeft: 8 },
});
