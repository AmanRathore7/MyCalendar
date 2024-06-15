import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyA6WtdQqd4znspLeij8xV-AqmZr86k0Zos",
  authDomain: "mycalendar-bcd58.firebaseapp.com",
  projectId: "mycalendar-bcd58",
  storageBucket: "mycalendar-bcd58.appspot.com",
  messagingSenderId: "165779020070",
  appId: "1:165779020070:web:b301456df062faad16c9e7"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

export { messaging };