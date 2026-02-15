import { io } from "socket.io-client";

// 1. Determine the Backend URL (removes '/api' if present)
const URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace("/api", "")
  : "http://localhost:4500";

// 2. Initialize the Socket Instance
export const socket = io(URL, {
  autoConnect: false, // Wait for Login! (Critical for Auth)
  withCredentials: true, // Allow cookies (good for CORS)
  reconnection: true, // Try to reconnect if server restarts
  reconnectionAttempts: 5, // Give up after 5 tries to save resources
  auth: {
    token: null, // Placeholder: We will set this in AuthContext
  },
});