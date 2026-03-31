# THRApps — THR Minggu 4 State Management

## Informasi Mahasiswa
-	Nama : Benita Aryani
-	NIM  : 2410501023
-	Opsi : B - THRApps

## Deskripsi Aplikasi
THRApps adalah aplikasi untuk memanajemen pemasukan dan pengeluaran THR kamu selama hari raya supaya kamu tidak kesusahan dan kebingungan ketika "Loh, kok tiba tiba uangku sudah hilang semua!"

## Hooks yang Digunakan
-	useState: Digunakan untuk mengelola state lokal seperti type, amount, selectedCategory, note, isSubmitting, dan search. State ini dipakai pada proses input transaksi dan pencarian data transaksi di AddTransactionScreen.js dan HistoryScreen.js.
-	useEffect: Digunakan untuk menjalankan proses saat komponen pertama kali dimuat (mount), yaitu untuk mengambil data transaksi dari AsyncStorage serta melakukan penyimpanan otomatis (auto-save) ketika data transaksi berubah. Implementasi terdapat di THRContext.js.
-	useReducer: SET_TRANSACTIONS, ADD_TRANSACTION, DELETE_TRANSACTION, SET_FILTER, SET_LOADING, SET_TARGET, dan RESET_ALL.
-	Custom Hook:
    - useTHR(): Digunakan sebagai abstraksi untuk mengakses THRContext serta menyediakan data tambahan seperti ringkasan transaksi (summary), transaksi yang sudah difilter (filteredTransactions), dan data grafik (chartData). Hook ini dipakai di HomeScreen, HistoryScreen, ProfileScreen, dan TransactionCard.
    - useStorage(): Digunakan sebagai abstraksi untuk semua operasi AsyncStorage, seperti menyimpan dan mengambil data transaksi, tema aplikasi, serta target tabungan. Hook ini digunakan di THRContext, ThemeContext, dan ProfileScreen.

## Screenshot
<img width="738" height="1600" alt="image" src="https://github.com/user-attachments/assets/444905d6-44c6-4490-b08e-73a9cb6c0f41" />
<img width="1080" height="2340" alt="image" src="https://github.com/user-attachments/assets/24f54787-f9ec-4742-a490-595622f2da22" />
<img width="1080" height="2340" alt="image" src="https://github.com/user-attachments/assets/0d31382e-1542-4120-a6a1-72e74e4ebe79" />
<img width="738" height="1600" alt="image" src="https://github.com/user-attachments/assets/2934e8c7-0257-49ca-85a8-84e0c0b6f63a" />

## Cara Menjalankan
npm install && npx expo start
