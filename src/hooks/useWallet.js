import { useTHRContext } from "../context/THRContext";

export const useWallet = () => {
  const { state, dispatch } = useTHRContext();
  const transactions = state.transactions || [];

  const totalMasuk = transactions
    .filter((t) => t.type === "IN")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalKeluar = transactions
    .filter((t) => t.type === "OUT")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalSaldo = totalMasuk - totalKeluar;

  return {
    transactions,
    totalSaldo,
    totalMasuk,
    totalKeluar,
    addTransaction: (data) => dispatch({ type: "ADD_TRX", payload: data }),
    deleteTransaction: (id) => dispatch({ type: "DELETE_TRX", payload: id }),
  };
};
