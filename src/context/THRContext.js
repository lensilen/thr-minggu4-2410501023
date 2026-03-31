import { createContext, useEffect, useReducer, useRef } from "react";
import { useStorage } from "../hooks/useStorage";
import { ACTIONS, initialState, thrReducer } from "../reducers/thrReducer";

export const THRContext = createContext(null);

export function THRProvider({ children }) {
  const [state, dispatch] = useReducer(thrReducer, initialState);
  const { saveTransactions, loadTransactions, loadTarget } = useStorage();
  const isFirstLoad = useRef(true);

  // Load data dari AsyncStorage saat pertama kali
  useEffect(() => {
    async function loadData() {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const [transactions, target] = await Promise.all([
        loadTransactions(),
        loadTarget(),
      ]);
      dispatch({ type: ACTIONS.SET_TRANSACTIONS, payload: transactions });
      dispatch({ type: ACTIONS.SET_TARGET, payload: target });
    }
    loadData();
  }, []);

  // Auto-save setiap kali transactions berubah
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    saveTransactions(state.transactions);
  }, [state.transactions]);

  return (
    <THRContext.Provider value={{ state, dispatch }}>
      {children}
    </THRContext.Provider>
  );
}
