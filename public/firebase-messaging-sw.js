importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDJ5lHpGuSYOvLtI__PXPEfipmrGtwSS0Q",
  authDomain: "order-tracker-8f813.firebaseapp.com",
  projectId: "order-tracker-8f813",
  storageBucket: "order-tracker-8f813.firebasestorage.app",
  messagingSenderId: "435383832782",
  appId: "1:435383832782:web:6a987ba4203ccf1e65809f",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/logo192.png",
  });
});