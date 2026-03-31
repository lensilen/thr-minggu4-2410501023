export const ACTIONS = {
  SET_TRANSACTIONS: "SET_TRANSACTIONS",
  ADD_TRANSACTION: "ADD_TRANSACTION",
  DELETE_TRANSACTION: "DELETE_TRANSACTION",
  SET_FILTER: "SET_FILTER",
  SET_LOADING: "SET_LOADING",
  SET_TARGET: "SET_TARGET",
  RESET_ALL: "RESET_ALL",
};

export const initialState = {
  transactions: [],
  filter: "semua", // 'semua' | 'pemasukan' | 'pengeluaran'
  isLoading: true,
  savingTarget: 0,
};

export function thrReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
        isLoading: false,
      };

    case ACTIONS.ADD_TRANSACTION:
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };

    case ACTIONS.DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };

    case ACTIONS.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    case ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case ACTIONS.SET_TARGET:
      return {
        ...state,
        savingTarget: action.payload,
      };

    case ACTIONS.RESET_ALL:
      return {
        ...initialState,
        isLoading: false,
      };

    default:
      return state;
  }
}
