const twilio = require('twilio');

// Configura tus credenciales de Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

exports.handler = async function(event, context) {
    const data = JSON.parse(event.body);
    const { to, trackingNumber, nombreCliente, destino, valor, nombrePaquete } = data; // Datos enviados desde el evento

    // Generar la URL dinámica del QR basado en el número de seguimiento (trackingNumber)
    const qrUrl = `https://firebasestorage.googleapis.com/v0/b/estradaencomiendas0.appspot.com/o/qr_codes%2F${trackingNumber}.png?alt=media`;

    try {
        // Enviar mensaje usando la nueva plantilla aprobada
        const message = await client.messages.create({
            from: 'whatsapp:+50369228310', // Número de WhatsApp de Twilio
            to: `whatsapp:${to}`, // Número de la vendedora en formato de WhatsApp
            contentSid: 'HX7c7f5d4f64e4877cdd8dcb113cd30ee8', // Content SID de tu plantilla aprobada
            contentVariables: JSON.stringify({
                '1': trackingNumber,     // Variable 1: número de seguimiento
                '2': nombreCliente,      // Variable 2: nombre de la clienta
                '3': destino,            // Variable 3: destino
                '4': valor,              // Variable 4: valor del paquete
                '5': nombrePaquete       // Variable 5: nombre de la página/paquete
            }),
            mediaUrl: [qrUrl] // URL dinámica para el código QR
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message })
        };
    } catch (error) {
        console.error('Error enviando mensaje de WhatsApp: ', error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: error.message })
        };
    }
};

