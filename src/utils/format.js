export function formatRupiah(amount, short = false) {
  if (short) {
    if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)}jt`;
    if (amount >= 1_000) return `${(amount / 1_000).toFixed(0)}rb`;
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(amount)
    .replace("IDR", "Rp")
    .trim();
}

export function formatDate(isoString) {
  const d = new Date(isoString);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
