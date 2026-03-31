export const CATEGORIES = {
  pemasukan: [
    {
      id: "thr_kantor",
      label: "THR dari Kantor",
      icon: "🏢",
      color: "#4CAF50",
    },
    {
      id: "thr_ortu",
      label: "THR dari Orang Tua",
      icon: "👨‍👩‍👧",
      color: "#8BC34A",
    },
    {
      id: "thr_saudara",
      label: "THR dari Saudara",
      icon: "👫",
      color: "#CDDC39",
    },
    {
      id: "thr_kerabat",
      label: "THR dari Kerabat",
      icon: "🤝",
      color: "#66BB6A",
    },
    { id: "bonus", label: "Bonus", icon: "🎁", color: "#4DB6AC" },
  ],
  pengeluaran: [
    { id: "belanja", label: "Belanja Lebaran", icon: "🛍️", color: "#FF5722" },
    { id: "sedekah", label: "Sedekah / Zakat", icon: "🕌", color: "#FF9800" },
    { id: "investasi", label: "Investasi", icon: "📈", color: "#2196F3" },
    { id: "transportasi", label: "Transportasi", icon: "🚗", color: "#9C27B0" },
    { id: "makanan", label: "Makanan & Snack", icon: "🍔", color: "#F44336" },
    { id: "hampers", label: "Hampers / Parcel", icon: "🎀", color: "#E91E63" },
    { id: "lainnya", label: "Lainnya", icon: "📦", color: "#607D8B" },
  ],
};

export const ALL_CATEGORIES = [
  ...CATEGORIES.pemasukan,
  ...CATEGORIES.pengeluaran,
];

export const getCategoryById = (id) =>
  ALL_CATEGORIES.find((c) => c.id === id) || {
    id: "lainnya",
    label: "Lainnya",
    icon: "📦",
    color: "#607D8B",
  };
