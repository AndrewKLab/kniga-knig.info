// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
//     apiKey: "AIzaSyA36-3U3YsTwG6IRc72Ozq5mfrFp4U2OLo",
//     authDomain: "kniga-knig.firebaseapp.com",
//     projectId: "kniga-knig",
//     storageBucket: "kniga-knig.appspot.com",
//     messagingSenderId: "939497128330",
//     appId: "1:939497128330:web:57a893dd141d4287560873",
//     measurementId: "G-R8EQC1KGRY"
// };

// const publicKey = "BJ4idnM6Nn_C3pT6CItQC4yiMGwxGkpAarSywAJouKYzYwanedolLDcwmf79WpPkPYLG0e9ULr9aRhzA9QxxlSQ";

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const messaging = (async () => {
//     try {
//         const isSupportedBrowser = await isSupported();
//         if (isSupportedBrowser) {
//             return getMessaging(app);
//         }
//         console.log('Firebase not supported this browser');
//         return null;
//     } catch (err) {
//         console.log(err);
//         return null;
//     }
//     })();

// export const getFBCToken = async (setTokenFound) => {
//     let currentToken = "";
  
//     try {
//       currentToken = await getToken({ vapidKey: publicKey });
//       if (currentToken) {
//         setTokenFound(true);
//       } else {
//         setTokenFound(false);
//       }
//     } catch (error) {
//       console.log("An error occurred while retrieving token. ", error);
//     }
  
//     return currentToken;
//   };

// export const onMessageListener = () =>
//     new Promise((resolve) => {
//         onMessage(messaging, (payload) => {
//             resolve(payload);
//         });
//     });