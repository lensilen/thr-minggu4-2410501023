import { useContext, useMemo } from "react";
import { THRContext } from "../context/THRContext";

// Custom hook reusable — dipakai di HomeScreen, HistoryScreen, ProfileScreen
export function useTHR() {
  const context = useContext(THRContext);
  if (!context) {
    throw new Error("useTHR must be used inside THRProvider");
  }

  const { state, dispatch } = context;

  const summary = useMemo(() => {
    const totalPemasukan = state.transactions
      .filter((t) => t.type === "pemasukan")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalPengeluaran = state.transactions
      .filter((t) => t.type === "pengeluaran")
      .reduce((sum, t) => sum + t.amount, 0);

    const saldo = totalPemasukan - totalPengeluaran;
    const persenHemat =
      totalPemasukan > 0 ? Math.round((saldo / totalPemasukan) * 100) : 0;

    return { totalPemasukan, totalPengeluaran, saldo, persenHemat };
  }, [state.transactions]);

  const filteredTransactions = useMemo(() => {
    if (state.filter === "semua") return state.transactions;
    return state.transactions.filter((t) => t.type === state.filter);
  }, [state.transactions, state.filter]);

  const chartData = useMemo(() => {
    const categoryTotals = {};
    state.transactions
      .filter((t) => t.type === "pengeluaran")
      .forEach((t) => {
        categoryTotals[t.category] =
          (categoryTotals[t.category] || 0) + t.amount;
      });

    return Object.entries(categoryTotals).map(([key, val]) => ({
      x: key,
      y: val,
    }));
  }, [state.transactions]);

  return {
    state,
    dispatch,
    summary,
    filteredTransactions,
    chartData,
  };
}
