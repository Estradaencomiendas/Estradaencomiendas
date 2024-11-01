const twilio = require('twilio');

// Configura tus credenciales de Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

exports.handler = async function(event, context) {
    const data = JSON.parse(event.body);
    const {
        to,
        trackingNumber,
        nombreCliente,
        destino,
        valor,
        nombrePaquete,
        fechaEnvio,
        pinSeguridad,
        qrUrl // Añadir la variable qrUrl que contiene la URL completa del código QR
    } = data;

    // Agregar logs para depuración
    console.log('Datos recibidos:', data);
    console.log('URL del QR recibida:', qrUrl);

    try {
        // Enviar mensaje usando la nueva plantilla aprobada
        const message = await client.messages.create({
            from: 'whatsapp:+50369228310', // Número de WhatsApp de Twilio
            to: `whatsapp:${to}`, // Número de la vendedora en formato de WhatsApp
            contentSid: 'HX34e45ef0709243277d712d38aa243f44', // Usa el nuevo contentSid de tu plantilla aprobada
            contentVariables: JSON.stringify({
                '1': trackingNumber,   // Número de seguimiento
                '2': nombreCliente,    // Nombre de la clienta
                '3': destino,          // Destino
                '4': valor,            // Valor del paquete
                '5': nombrePaquete,    // Nombre de la Página
                '6': fechaEnvio,       // Fecha de envío
                '7': pinSeguridad,     // PIN de seguridad
                '8': qrUrl             // URL del código QR
            }),
            mediaUrl: [qrUrl] // Usar la URL del código QR como media en el mensaje
        });

        console.log('Mensaje enviado con éxito:', message);

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


