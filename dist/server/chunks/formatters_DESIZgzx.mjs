const COP_FORMATTER = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});
function formatPrice(amount, currency = "COP") {
  if (currency === "COP") return COP_FORMATTER.format(amount);
  return new Intl.NumberFormat("es-CO", { style: "currency", currency }).format(amount);
}
function formatDate(dateStr, options) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options
  });
}

export { formatPrice as a, formatDate as f };
