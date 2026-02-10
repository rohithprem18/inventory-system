const STORAGE_KEYS = {
  users: "users",
  products: "products",
  currentUser: "currentUser",
};

function safeParse(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function loadFromStorage(key, fallback) {
  return safeParse(localStorage.getItem(key), fallback);
}

export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeFromStorage(key) {
  localStorage.removeItem(key);
}

export { STORAGE_KEYS };
