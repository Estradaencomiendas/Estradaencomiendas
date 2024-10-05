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

// Manejar los mensajes en segundo plano
messaging.onBackgroundMessage((payload) => {
    console.log('Recibido mensaje en segundo plano: ', payload);

    // Extraer los datos que necesitas del mensaje push
    const notificationTitle = payload.notification.title || 'Pago confirmado';
    const notificationOptions = {
        body: payload.notification.body || 'Un paquete ha sido marcado como pagado.',
        icon: '/icon.png',  // Puedes agregar el ícono de tu app aquí
        data: {
            trackingNumber: payload.data.trackingNumber,  // Pasar detalles adicionales aquí
            clientName: payload.data.clientName,          // Ejemplo de nombre del cliente
        }
    };

    // Mostrar la notificación
    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Manejar el clic en la notificación para abrir los detalles del paquete
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    
    // Extraer los datos que se pasaron a través de la notificación
    const trackingNumber = event.notification.data.trackingNumber;
    const clientName = event.notification.data.clientName;

    // Redirigir al usuario a la página de detalles del paquete
    event.waitUntil(
        clients.openWindow('/detallesPaquete.html?trackingNumber=' + trackingNumber + '&clientName=' + clientName)
    );
});
