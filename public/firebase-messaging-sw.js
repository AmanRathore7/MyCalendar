// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyA6WtdQqd4znspLeij8xV-AqmZr86k0Zos",
  authDomain: "mycalendar-bcd58.firebaseapp.com",
  projectId: "mycalendar-bcd58",
  storageBucket: "mycalendar-bcd58.appspot.com",
  messagingSenderId: "165779020070",
  appId: "1:165779020070:web:b301456df062faad16c9e7"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log('Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});
