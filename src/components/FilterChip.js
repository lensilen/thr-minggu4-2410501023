import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { useTHR } from "../hooks/useTHR";
import { ACTIONS } from "../reducers/thrReducer";

const FILTERS = [
  { key: "semua", label: "semua" },
  { key: "pemasukan", label: "pemasukan" },
  { key: "pengeluaran", label: "pengeluaran" },
];

export function FilterChip() {
  const { colors } = useContext(ThemeContext);
  const { state, dispatch } = useTHR();

  return (
    <View style={styles.row}>
      {FILTERS.map((f) => {
        const active = state.filter === f.key;
        return (
          <TouchableOpacity
            key={f.key}
            onPress={() =>
              dispatch({ type: ACTIONS.SET_FILTER, payload: f.key })
            }
            style={[
              styles.chip,
              {
                backgroundColor: active ? colors.primary : colors.inputBg,
                borderColor: active ? colors.primary : colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.text,
                { color: active ? "#fff" : colors.textSecondary },
              ]}
            >
              {f.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 8, marginBottom: 14 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  text: { fontSize: 12, fontWeight: "600" },
});
