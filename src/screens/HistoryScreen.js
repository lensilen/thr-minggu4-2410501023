import { useContext, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmptyState } from "../components/EmptyState";
import { FilterChip } from "../components/FilterChip";
import { TransactionCard } from "../components/TransactionCard";
import { ThemeContext } from "../context/ThemeContext";
import { useTHR } from "../hooks/useTHR";

export function HistoryScreen() {
  const { colors } = useContext(ThemeContext);
  const { filteredTransactions } = useTHR();
  const [search, setSearch] = useState("");

  const displayed = filteredTransactions.filter(
    (t) =>
      t.note?.toLowerCase().includes(search.toLowerCase()) ||
      t.category?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          📋 Riwayat Cuan
        </Text>
        <TextInput
          style={[
            styles.search,
            {
              backgroundColor: colors.inputBg,
              borderColor: colors.border,
              color: colors.text,
            },
          ]}
          placeholder="Cari transaksi..."
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
        <FilterChip />
      </View>

      <FlatList
        data={displayed}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<EmptyState message="Transaksi tidak ditemukan~" />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 8 },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 14 },
  search: {
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    marginBottom: 14,
  },
  list: { paddingHorizontal: 20, paddingBottom: 40 },
});
