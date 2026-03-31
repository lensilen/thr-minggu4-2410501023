import { LinearGradient } from "expo-linear-gradient";
import { useContext, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmptyState } from "../components/EmptyState";
import { FilterChip } from "../components/FilterChip";
import { ProgressChart } from "../components/ProgressChart";
import { SummaryCard } from "../components/SummaryCard";
import { TransactionCard } from "../components/TransactionCard";
import { ThemeContext } from "../context/ThemeContext";
import { useTHR } from "../hooks/useTHR";

export function HomeScreen({ navigation }) {
  const { colors, isDark } = useContext(ThemeContext);
  const { summary, filteredTransactions, state } = useTHR();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      >
        {/* Header Gradient */}
        <LinearGradient
          colors={isDark ? ["#3D1A2A", "#1A1A2E"] : ["#FFE4EE", "#FFF5F8"]}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <View>
              <Text style={[styles.greeting, { color: colors.primary }]}>
                Halo, Bestie! 🌙
              </Text>
              <Text style={[styles.subtitle, { color: colors.text }]}>
                THR-ku Mana nih~
              </Text>
            </View>
            <Text style={styles.avatar}>🐥</Text>
          </View>

          <Text style={[styles.labelSaldo, { color: colors.textSecondary }]}>
            total saldo
          </Text>
          <Text style={[styles.saldo, { color: colors.text }]}>
            Rp {summary.saldo.toLocaleString("id-ID")}
          </Text>
          {summary.persenHemat > 0 && (
            <Text style={[styles.hemat, { color: colors.primary }]}>
              ✨ udah hemat {summary.persenHemat}% dari pemasukan!
            </Text>
          )}

          <SummaryCard
            totalPemasukan={summary.totalPemasukan}
            totalPengeluaran={summary.totalPengeluaran}
            jumlahTransaksi={state.transactions.length}
          />
        </LinearGradient>

        <View style={styles.body}>
          {/* Progress Chart */}
          {state.transactions.length > 0 && <ProgressChart summary={summary} />}

          {/* Riwayat */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              ✅ riwayat cuan
            </Text>
          </View>
          <FilterChip />

          {state.isLoading ? (
            <EmptyState message="Lagi loading..." />
          ) : filteredTransactions.length === 0 ? (
            <EmptyState />
          ) : (
            filteredTransactions
              .slice(0, 5)
              .map((t) => <TransactionCard key={t.id} transaction={t} />)
          )}

          {filteredTransactions.length > 5 && (
            <TouchableOpacity
              onPress={() => navigation.navigate("Riwayat")}
              style={[styles.lihatSemua, { borderColor: colors.primary }]}
            >
              <Text
                style={[styles.lihatSemua__text, { color: colors.primary }]}
              >
                Lihat semua ({filteredTransactions.length}) →
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate("Tambah")}
        activeOpacity={0.85}
      >
        <Text style={styles.fabText}>⊕ catat transaksi baru~</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24 },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  greeting: { fontSize: 14, fontWeight: "600" },
  subtitle: { fontSize: 22, fontWeight: "800", marginTop: 2 },
  avatar: { fontSize: 40 },
  labelSaldo: { fontSize: 12, marginBottom: 4 },
  saldo: { fontSize: 32, fontWeight: "800" },
  hemat: { fontSize: 12, marginTop: 4, fontWeight: "600" },
  body: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 120 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 15, fontWeight: "700" },
  lihatSemua: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    marginTop: 4,
  },
  lihatSemua__text: { fontWeight: "600", fontSize: 13 },
  fab: {
    position: "absolute",
    bottom: 24,
    left: 20,
    right: 20,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#FF6B9D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  fabText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
