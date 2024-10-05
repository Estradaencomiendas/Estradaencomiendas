// Import the scripts needed for Firebase Messaging
importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js');

// Inicializar Firebase en el Service Worker
const firebaseConfig = {
    apiKey: "AIzaSyA42b2B9K4J8BMWa9FfHXFu2sAR0aFYm-M",
    authDomain: "estradaencomiendas0.firebaseapp.com",
    projectId: "estradaencomiendas0",
    storageBucket: "estradaencomiendas0.appspot.com",
    messagingSenderId: "247979951336",
    appId: "1:247979951336:web:92b6b4bf615595676755d",
    measurementId: "G-BRMC9FZBC"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Manejar los mensajes recibidos cuando la aplicación está en segundo plano
messaging.onBackgroundMessage((payload) => {
    console.log('Recibido mensaje en segundo plano: ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/icon.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
