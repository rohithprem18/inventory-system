import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "./storage.js";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function loadProducts() {
  return loadFromStorage(STORAGE_KEYS.products, []);
}

export function saveProducts(products) {
  saveToStorage(STORAGE_KEYS.products, products);
}

export function normalizeDate(dateStr) {
  return new Date(`${dateStr}T00:00:00`);
}

export function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function daysUntil(expiryDateStr) {
  const expiry = normalizeDate(expiryDateStr);
  const today = startOfToday();
  return Math.ceil((expiry - today) / MS_PER_DAY);
}

export function getExpiryStatus(expiryDateStr) {
  // Expired: before today. Expiring: today through 7 days. Safe: beyond 7 days.
  const delta = daysUntil(expiryDateStr);
  if (delta < 0) return "expired";
  if (delta <= 7) return "expiring";
  return "safe";
}

export function splitByExpiry(products) {
  const expired = [];
  const expiringSoon = [];
  const safe = [];

  products.forEach((product) => {
    const status = getExpiryStatus(product.expiryDate);
    if (status === "expired") expired.push(product);
    else if (status === "expiring") expiringSoon.push(product);
    else safe.push(product);
  });

  return {
    expired: sortByExpiry(expired),
    expiringSoon: sortByExpiry(expiringSoon),
    safe: sortByExpiry(safe),
  };
}

export function sortByExpiry(products) {
  return [...products].sort((a, b) => {
    return normalizeDate(a.expiryDate) - normalizeDate(b.expiryDate);
  });
}

export function filterNonExpired(products) {
  return products.filter((p) => getExpiryStatus(p.expiryDate) !== "expired");
}
