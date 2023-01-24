// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDspzc7EIbHytDY1MVjj_N41c3mFnAMYLw",
  authDomain: "kniga-knig-dev.firebaseapp.com",
  projectId: "kniga-knig-dev",
  storageBucket: "kniga-knig-dev.appspot.com",
  messagingSenderId: "861384103549",
  appId: "1:861384103549:web:d3bd468e69ac64bb4e0314",
  measurementId: "G-CKYPYSW6FZ"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});