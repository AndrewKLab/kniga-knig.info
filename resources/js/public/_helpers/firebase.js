// import { initializeApp } from 'firebase/app';
// import { getToken, onMessage, getMessaging } from 'firebase/messaging';

// let firebaseApp = null;
// try {
//   firebaseApp = initializeApp({
//     apiKey: "AIzaSyDspzc7EIbHytDY1MVjj_N41c3mFnAMYLw",
//     authDomain: "kniga-knig-dev.firebaseapp.com",
//     projectId: "kniga-knig-dev",
//     storageBucket: "kniga-knig-dev.appspot.com",
//     messagingSenderId: "861384103549",
//     appId: "1:861384103549:web:d3bd468e69ac64bb4e0314",
//     measurementId: "G-CKYPYSW6FZ"
//   });
//   } catch (err) {
//   // we skip the "already exists" message which is
//   // not an actual error when we're hot-reloading
//   if (!/already exists/.test(err.message)) {
//   console.error('Firebase initialization error', err.stack)
//   }
//   }



// const messaging = getMessaging(firebaseApp);

// export const getTokenHelper = async () => {

//     try {
//         const currentToken = await getToken(messaging, { vapidKey: 'BCggiV8_UEHm3Cd-FwLhxJeiAhqxz-YNhioXhKisPrBCjtE0mZuVd1qF2C-SJTrSkKG_bNSHEdtPjOm42uXyt38' });
//         if (currentToken) {
//             //console.log(currentToken)
//             // localStorage.setItem('FBCtoken', currentToken);
//             // onMessage(messaging, (payload) => {
//             //     console.log(payload);
//             //     openNotification(payload, dispatch)
//             // });
            
//         } else {
//             console.log('No registration token available. Request permission to generate one.');
//         }
//     } catch (err) {
//         console.log('An error occurred while retrieving token. ', err);
//     }
// }

// // const openNotification = (payload, dispatch) => {
// //     const key = `open${Date.now()}`;
// //     const { title, body } = payload.notification;
// //     const { chat_id, created, message, message_id, read_status, send_from, send_to } = payload.data;
// //     const message_data = {
// //         chat_id,
// //         created,
// //         message,
// //         message_id,
// //         read_status,
// //         send_from,
// //         send_to,
// //     }
// //     notification.open({
// //         message: title,
// //         description: body,
// //         key,
// //         onClick: () => console.log('click'),
// //         placement: 'bottomLeft'
// //     });
    
// //     dispatch(chatActions.getNewMessage(chat_id, message_data))
// // };




// // export const onMessageListener = () =>
// //   new Promise((resolve) => {
// //     console.log('payload')
// //     onMessage(messaging, (payload) => {
// //       console.log(payload);
// //     });
// // });