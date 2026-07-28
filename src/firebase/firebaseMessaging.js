 import { getToken , onMessage} from "firebase/messaging";

import { messaging } from "./firebase";


export const requestNotificationPermission = async () => {
  try {
    console.log("=== requestNotificationPermission START ===");

    const permission = await Notification.requestPermission();
    console.log("Permission:", permission);

    if (permission !== "granted") {
      console.log("Notification permission denied");
      return null;
    }

    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );

    console.log("Service Worker:", registration);

    const currentToken = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    console.log("Current Token:", currentToken);

    return currentToken;
  } catch (error) {
    console.error("FCM Error:", error);
    return null;
  }
};


export const listenForMessages = () => {
  onMessage(messaging, (payload) => {
    console.log("Foreground Message:", payload);

    new Notification(payload.notification.title, {
      body: payload.notification.body,
      icon: "/logo192.png",
    });
  });
};

