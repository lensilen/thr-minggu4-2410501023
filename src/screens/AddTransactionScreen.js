import { useContext, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CATEGORIES } from "../constants/categories";
import { ThemeContext } from "../context/ThemeContext";
import { useTHR } from "../hooks/useTHR";
import { ACTIONS } from "../reducers/thrReducer";
import { generateId } from "../utils/format";

export function AddTransactionScreen({ navigation }) {
  const { colors } = useContext(ThemeContext);
  const { dispatch } = useTHR();

  // useState — minimal 3 state lokal
  const [type, setType] = useState("pemasukan");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = CATEGORIES[type];

  const handleSubmit = async () => {
    if (!amount || isNaN(Number(amount.replace(/\./g, "")))) {
      return Alert.alert("Oops!", "Masukkan jumlah yang valid ya~");
    }
    if (!selectedCategory) {
      return Alert.alert("Oops!", "Pilih kategori dulu dong~");
    }

    setIsSubmitting(true);

    const newTransaction = {
      id: generateId(),
      type,
      amount: Number(amount.replace(/\./g, "")),
      category: selectedCategory,
      note: note.trim(),
      date: new Date().toISOString(),
    };

    dispatch({ type: ACTIONS.ADD_TRANSACTION, payload: newTransaction });

    setTimeout(() => {
      setIsSubmitting(false);
      navigation.goBack();
    }, 300);
  };

  const formatAmountInput = (text) => {
    const num = text.replace(/\D/g, "");
    const formatted = Number(num).toLocaleString("id-ID");
    setAmount(formatted === "0" ? "" : formatted);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backBtn}
            >
              <Text style={[styles.backText, { color: colors.primary }]}>
                ← Kembali
              </Text>
            </TouchableOpacity>
            <Text style={[styles.title, { color: colors.text }]}>
              Catat Transaksi
            </Text>
          </View>

          {/* Toggle Tipe */}
          <View style={[styles.toggle, { backgroundColor: colors.inputBg }]}>
            {["pemasukan", "pengeluaran"].map((t) => (
              <TouchableOpacity
                key={t}
                style={[
                  styles.toggleBtn,
                  type === t && {
                    backgroundColor:
                      t === "pemasukan" ? colors.income : colors.expense,
                  },
                ]}
                onPress={() => {
                  setType(t);
                  setSelectedCategory("");
                }}
              >
                <Text
                  style={[
                    styles.toggleText,
                    { color: type === t ? "#fff" : colors.textSecondary },
                  ]}
                >
                  {t === "pemasukan" ? "📥 Pemasukan" : "📤 Pengeluaran"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Nominal */}
          <Text style={[styles.label, { color: colors.text }]}>
            Jumlah (Rp)
          </Text>
          <View
            style={[
              styles.inputWrap,
              { backgroundColor: colors.inputBg, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.prefix, { color: colors.textSecondary }]}>
              Rp
            </Text>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="0"
              placeholderTextColor={colors.textMuted}
              keyboardType="numeric"
              value={amount}
              onChangeText={formatAmountInput}
            />
          </View>

          {/* Kategori */}
          <Text style={[styles.label, { color: colors.text }]}>Kategori</Text>
          <View style={styles.catGrid}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setSelectedCategory(cat.id)}
                style={[
                  styles.catItem,
                  {
                    backgroundColor:
                      selectedCategory === cat.id
                        ? cat.color + "30"
                        : colors.inputBg,
                    borderColor:
                      selectedCategory === cat.id ? cat.color : colors.border,
                  },
                ]}
              >
                <Text style={styles.catIcon}>{cat.icon}</Text>
                <Text
                  style={[
                    styles.catLabel,
                    {
                      color:
                        selectedCategory === cat.id
                          ? cat.color
                          : colors.textSecondary,
                    },
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Catatan */}
          <Text style={[styles.label, { color: colors.text }]}>
            Catatan (opsional)
          </Text>
          <TextInput
            style={[
              styles.noteInput,
              {
                backgroundColor: colors.inputBg,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
            placeholder="Tulis catatan singkat..."
            placeholderTextColor={colors.textMuted}
            value={note}
            onChangeText={setNote}
            multiline
          />

          {/* Submit */}
          <TouchableOpacity
            style={[
              styles.btn,
              {
                backgroundColor: colors.primary,
                opacity: isSubmitting ? 0.7 : 1,
              },
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.btnText}>
              {isSubmitting ? "Menyimpan..." : "✅ Simpan Transaksi"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { padding: 20, paddingBottom: 60 },
  header: { marginBottom: 24 },
  backBtn: { marginBottom: 8 },
  backText: { fontSize: 14, fontWeight: "600" },
  title: { fontSize: 24, fontWeight: "800" },
  toggle: {
    flexDirection: "row",
    borderRadius: 14,
    padding: 4,
    marginBottom: 24,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  toggleText: { fontSize: 13, fontWeight: "700" },
  label: { fontSize: 13, fontWeight: "600", marginBottom: 8, marginTop: 16 },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  prefix: { fontSize: 16, fontWeight: "700", marginRight: 8 },
  input: { flex: 1, fontSize: 22, fontWeight: "800" },
  catGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  catItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1.5,
    marginBottom: 4,
  },
  catIcon: { fontSize: 16 },
  catLabel: { fontSize: 11, fontWeight: "600" },
  noteInput: {
    borderRadius: 14,
    borderWidth: 1.5,
    padding: 14,
    minHeight: 80,
    textAlignVertical: "top",
    fontSize: 14,
  },
  btn: {
    marginTop: 28,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "800", fontSize: 16 },
});
