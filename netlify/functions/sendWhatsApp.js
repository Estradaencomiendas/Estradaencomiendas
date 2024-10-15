const twilio = require('twilio');

// Configura tus credenciales de Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

exports.handler = async function(event, context) {
    const data = JSON.parse(event.body);
    const { to, trackingNumber, nombreCliente, destino, valor, nombrePaquete, qrUrl } = data; // Agregar 'nombrePaquete' y 'qrUrl'

    try {
        // Enviar mensaje usando la plantilla aprobada
        const message = await client.messages.create({
            from: 'whatsapp:+50369228310', // Número de WhatsApp de Twilio
            to: `whatsapp:${to}`, // Número de la vendedora en formato de WhatsApp
            contentSid: 'HXdd870bd497f5c1887cf678e04f589b8', // Usa el contentSid de tu plantilla aprobada
            contentVariables: JSON.stringify({
                '1': trackingNumber,     // Variable 1 es el número de seguimiento
                '2': nombreCliente,      // Variable 2 es el nombre de la clienta
                '3': destino,            // Variable 3 es el destino
                '4': valor,              // Variable 4 es el valor del paquete
                '5': nombrePaquete,      // Nueva variable: Nombre de la Página
                '6': qrUrl               // Nueva variable: URL del código QR
            })
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: error.message })
        };
    }
};


