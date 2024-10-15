const twilio = require('twilio');

// Configura tus credenciales de Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

exports.handler = async function(event, context) {
    const data = JSON.parse(event.body);
    const { to, trackingNumber, nombreCliente, destino, valor, nombrePaquete, qrUrl } = data; // Agregar 'nombrePaquete' y 'qrUrl'

    try {
        // Enviar mensaje con imagen usando Twilio
        const message = await client.messages.create({
            from: 'whatsapp:+50369228310', // Número de WhatsApp de Twilio
            to: `whatsapp:${to}`, // Número de la vendedora en formato de WhatsApp
            body: `Gracias por enviar con Estrada Encomiendas.\nTu número de seguimiento es: ${trackingNumber}\nNombre de la clienta: ${nombreCliente}\nDestino: ${destino}\nValor: $${valor}\nNombre de la Página: ${nombrePaquete}`,
            mediaUrl: [qrUrl] // URL de la imagen del código QR
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
