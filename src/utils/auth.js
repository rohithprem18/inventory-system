import { loadFromStorage, saveToStorage, removeFromStorage, STORAGE_KEYS } from "./storage.js";

function getUsers() {
  return loadFromStorage(STORAGE_KEYS.users, []);
}

function setUsers(users) {
  saveToStorage(STORAGE_KEYS.users, users);
}

export async function hashPassword(password) {
  // Browser-only SHA-256 hashing for demo-level local storage security.
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function registerUser({ name, email, password, role }) {
  const users = getUsers();
  const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    throw new Error("Email already registered");
  }

  const passwordHash = await hashPassword(password);
  const newUser = {
    id: crypto.randomUUID?.() ?? String(Date.now()),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password: passwordHash,
    role,
  };

  setUsers([...users, newUser]);
  return sanitizeUser(newUser);
}

export async function loginUser({ email, password }) {
  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const passwordHash = await hashPassword(password);
  if (user.password !== passwordHash) {
    throw new Error("Invalid credentials");
  }

  return sanitizeUser(user);
}

export function saveCurrentUser(user) {
  saveToStorage(STORAGE_KEYS.currentUser, user);
}

export function getCurrentUser() {
  return loadFromStorage(STORAGE_KEYS.currentUser, null);
}

export function clearCurrentUser() {
  removeFromStorage(STORAGE_KEYS.currentUser);
}

export function sanitizeUser(user) {
  if (!user) return null;
  const { password, ...safe } = user;
  return safe;
}
