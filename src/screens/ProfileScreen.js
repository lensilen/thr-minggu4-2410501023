import { useContext, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressChart } from "../components/ProgressChart";
import { ThemeContext } from "../context/ThemeContext";
import { useStorage } from "../hooks/useStorage";
import { useTHR } from "../hooks/useTHR";
import { ACTIONS } from "../reducers/thrReducer";
import { formatRupiah } from "../utils/format";

export function ProfileScreen() {
  const { colors, isDark, toggleTheme } = useContext(ThemeContext);
  const { summary, state, dispatch } = useTHR();
  const { clearAll, saveTarget } = useStorage();
  const [targetInput, setTargetInput] = useState(state.savingTarget.toString());

  const handleReset = () => {
    Alert.alert(
      "Reset Semua Data?",
      "Semua transaksi THR akan dihapus permanen.",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            await clearAll();
            dispatch({ type: ACTIONS.RESET_ALL });
          },
        },
      ],
    );
  };

  const Row = ({ icon, label, right }) => (
    <View style={[styles.row, { borderBottomColor: colors.border }]}>
      <Text style={styles.rowIcon}>{icon}</Text>
      <Text style={[styles.rowLabel, { color: colors.text }]}>{label}</Text>
      {right}
    </View>
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>
          👤 Profil & Pengaturan
        </Text>

        {/* Visualisasi */}
        {state.transactions.length > 0 && <ProgressChart summary={summary} />}

        {/* Stats Card */}
        <View
          style={[
            styles.statsCard,
            { backgroundColor: colors.card, shadowColor: colors.shadow },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            💰 Statistik THR
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={[styles.statNum, { color: colors.income }]}>
                {formatRupiah(summary.totalPemasukan)}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Total Masuk
              </Text>
            </View>
            <View style={styles.stat}>
              <Text style={[styles.statNum, { color: colors.expense }]}>
                {formatRupiah(summary.totalPengeluaran)}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Total Keluar
              </Text>
            </View>
          </View>
          <Text style={[styles.savingText, { color: colors.saving }]}>
            🏦 Tabungan sisa: {formatRupiah(summary.saldo)} (
            {summary.persenHemat}%)
          </Text>
        </View>

        {/* Settings */}
        <View
          style={[
            styles.settingsCard,
            { backgroundColor: colors.card, shadowColor: colors.shadow },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            ⚙️ Pengaturan
          </Text>

          <Row
            icon="🌙"
            label="Dark Mode"
            right={
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ true: colors.primary }}
              />
            }
          />
          <Row
            icon="📊"
            label={`Total Transaksi: ${state.transactions.length}`}
            right={<Text style={{ color: colors.textSecondary }}>→</Text>}
          />
        </View>

        {/* Danger Zone */}
        <TouchableOpacity
          onPress={handleReset}
          style={[styles.resetBtn, { borderColor: colors.expense }]}
        >
          <Text style={[styles.resetText, { color: colors.expense }]}>
            🗑️ Reset Semua Data THR
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { padding: 20, paddingBottom: 60 },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 20 },
  statsCard: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  cardTitle: { fontSize: 15, fontWeight: "700", marginBottom: 14 },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  stat: { alignItems: "center" },
  statNum: { fontSize: 16, fontWeight: "800" },
  statLabel: { fontSize: 11, marginTop: 4 },
  savingText: { fontSize: 13, fontWeight: "600", textAlign: "center" },
  settingsCard: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  rowIcon: { fontSize: 18, marginRight: 12 },
  rowLabel: { flex: 1, fontSize: 14 },
  resetBtn: {
    borderWidth: 1.5,
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  resetText: { fontWeight: "700", fontSize: 14 },
});
