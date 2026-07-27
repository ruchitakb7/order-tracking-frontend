console.log("socket.js loaded");

import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

console.log(import.meta.env.VITE_SOCKET_URL);

export const socket = io(SOCKET_URL, {
  autoConnect: false,
});