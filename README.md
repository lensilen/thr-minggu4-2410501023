# 🌙 THR Manager — Tugas Minggu 4

> Aplikasi pencatat keuangan THR (Tunjangan Hari Raya) berbasis React Native + Expo

---

## 👩‍💻 Identitas

| Field         | Isi                      |
| ------------- | ------------------------ |
| Nama          | [Nama Kamu]              |
| NIM           | [NIM Kamu]               |
| Kelas         | [Kelas Kamu]             |
| Opsi Aplikasi | Opsi 2 — THR Manager App |

---

## 📱 Fitur Utama

- ✅ Catat pemasukan & pengeluaran THR
- ✅ Filter transaksi (semua / pemasukan / pengeluaran)
- ✅ Progress chart ringkasan keuangan
- ✅ Dark Mode (ThemeContext)
- ✅ Hapus transaksi (long press)
- ✅ Data tersimpan permanen via AsyncStorage
- ✅ Search transaksi di halaman riwayat

---

## 🛠️ Cara Menjalankan

```bash
# 1. Clone repo
git clone https://github.com/[username]/thr-minggu4-[NIM].git
cd thr-minggu4-[NIM]

# 2. Install dependencies
npm install

# 3. Jalankan
npx expo start
```

Scan QR dengan Expo Go (Android/iOS).

---

## 📋 Checklist Teknis

### Wajib

| Requirement                   | Implementasi                                                                                                        | File                                          |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `useState` ≥ 3 state lokal    | `type`, `amount`, `selectedCategory`, `note`, `isSubmitting`, `search`                                              | `AddTransactionScreen.js`, `HistoryScreen.js` |
| `useEffect`                   | Load AsyncStorage saat mount, auto-save transactions                                                                | `THRContext.js`                               |
| `createContext + Provider`    | `THRContext`, `ThemeContext`                                                                                        | `context/`                                    |
| `useContext` ≥ 2 komponen     | Dipakai di semua screen & components                                                                                | semua file                                    |
| `useReducer` ≥ 4 action types | `SET_TRANSACTIONS`, `ADD_TRANSACTION`, `DELETE_TRANSACTION`, `SET_FILTER`, `SET_LOADING`, `SET_TARGET`, `RESET_ALL` | `thrReducer.js`                               |
| Custom Hook                   | `useTHR()` → dipakai di HomeScreen, HistoryScreen, ProfileScreen, TransactionCard                                   | `hooks/useTHR.js`                             |
| Custom Hook                   | `useStorage()` → dipakai di THRContext, ThemeContext, ProfileScreen                                                 | `hooks/useStorage.js`                         |
| `AsyncStorage`                | Persist transactions, theme, saving target                                                                          | `useStorage.js`                               |
| `FlatList`                    | Daftar transaksi di HistoryScreen                                                                                   | `HistoryScreen.js`                            |

### Bonus

| Bonus                             | Status  |
| --------------------------------- | ------- |
| Dark Mode (ThemeContext terpisah) | ✅ Done |
| Visualisasi data (progress bar)   | ✅ Done |

---

## 📁 Struktur File

```
src/
├── context/
│   ├── THRContext.js       ← Global state + useReducer
│   └── ThemeContext.js     ← Dark mode Context
├── hooks/
│   ├── useTHR.js           ← Custom hook (reused 3+ tempat)
│   └── useStorage.js       ← Custom hook AsyncStorage (reused 3+ tempat)
├── reducers/
│   └── thrReducer.js       ← 7 action types
├── screens/
│   ├── HomeScreen.js
│   ├── AddTransactionScreen.js
│   ├── HistoryScreen.js
│   └── ProfileScreen.js
├── components/
│   ├── TransactionCard.js
│   ├── SummaryCard.js
│   ├── ProgressChart.js
│   ├── FilterChip.js
│   └── EmptyState.js
├── constants/
│   ├── colors.js
│   └── categories.js
└── utils/
    └── format.js
```

---

## 🧠 Penjelasan State Management

### THRContext + useReducer

Global state untuk semua data transaksi. Reducer menangani 7 action types:

- `SET_TRANSACTIONS` — load dari storage
- `ADD_TRANSACTION` — tambah transaksi baru
- `DELETE_TRANSACTION` — hapus transaksi
- `SET_FILTER` — filter riwayat
- `SET_LOADING` — loading state
- `SET_TARGET` — target tabungan
- `RESET_ALL` — reset semua data

### ThemeContext (Bonus)

Context terpisah untuk dark/light mode. State theme di-persist ke AsyncStorage.

### Custom Hooks

- `useTHR()` — abstraksi akses THRContext + computed values (summary, filteredTransactions, chartData). Dipakai di HomeScreen, HistoryScreen, ProfileScreen, TransactionCard.
- `useStorage()` — abstraksi semua operasi AsyncStorage. Dipakai di THRContext, ThemeContext, ProfileScreen.

---

## 🖼️ Screenshots

> _(Tambahkan screenshot setelah running app)_

| Home                          | Tambah                      | Riwayat                             | Dark Mode                     |
| ----------------------------- | --------------------------- | ----------------------------------- | ----------------------------- |
| ![home](screenshots/home.png) | ![add](screenshots/add.png) | ![history](screenshots/history.png) | ![dark](screenshots/dark.png) |
