// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyA36-3U3YsTwG6IRc72Ozq5mfrFp4U2OLo",
    authDomain: "kniga-knig.firebaseapp.com",
    projectId: "kniga-knig",
    storageBucket: "kniga-knig.appspot.com",
    messagingSenderId: "939497128330",
    appId: "1:939497128330:web:57a893dd141d4287560873",
    measurementId: "G-R8EQC1KGRY"
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