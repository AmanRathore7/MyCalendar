import React, { useEffect } from 'react';
import MyCalendar from './components/Calendar';
import './App.css';
import { messaging } from './firebaseConfig';

function App() {

  useEffect(() => {
    const requestPermission = async () => {
        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                console.log('Notification permission granted.');
                const token = await messaging.getToken();

                // Send the token to your server or save it in localStorage
                localStorage.setItem("fcm_token",token);

            } else {
                console.error('Unable to get permission to notify.');
            }
        } catch (error) {
            console.error('An error occurred while requesting permission', error);
        }
    };

    requestPermission();

    messaging.onMessage((payload) => {
        console.log('Message received. ', payload);
        // Customize notification here
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
            body: payload.notification.body,
            icon: payload.notification.icon
        };

        new Notification(notificationTitle, notificationOptions);
    });
}, []);

  return (
    <div className="App">
      <MyCalendar />
    </div>
  );
}

export default App;
