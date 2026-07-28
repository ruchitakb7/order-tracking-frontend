
import { io } from "socket.io-client";
console.log("socket.js loaded");

const SOCKET_URL = "https://order-tracking-backend-uaj0.onrender.com";


//  const SOCKET_URL = "http://localhost:5000";

//  console.log(import.meta.env.VITE_SOCKET_URL);

export const socket = io(SOCKET_URL, {
  autoConnect: false,
});