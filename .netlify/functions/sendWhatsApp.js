const twilio = require('twilio');

// Configura tus credenciales de Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

exports.handler = async function(event, context) {
    const data = JSON.parse(event.body);
    const { to, trackingNumber, nombreCliente, destino, valor, nombrePaquete, qrUrl } = data; // Datos enviados desde el evento

    try {
        // Enviar mensaje usando la nueva plantilla aprobada
        const message = await client.messages.create({
            from: 'whatsapp:+50369228310', // Número de WhatsApp de Twilio
            to: `whatsapp:${to}`, // Número de la vendedora en formato de WhatsApp
            contentSid: 'Hxa6f731eef12b1eb1f8d1e5bcefb0b66b', // Content SID de tu plantilla aprobada
            contentVariables: JSON.stringify({
                '1': trackingNumber,     // Variable 1: número de seguimiento
                '2': nombreCliente,      // Variable 2: nombre de la clienta
                '3': destino,            // Variable 3: destino
                '4': valor,              // Variable 4: valor del paquete
                '5': nombrePaquete       // Variable 5: nombre de la página/paquete
            }),
            mediaUrl: [qrUrl] // Enviar la imagen del código QR como media
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

