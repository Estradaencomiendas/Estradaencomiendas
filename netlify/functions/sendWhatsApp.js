const twilio = require('twilio');

// Configura tus credenciales de Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

exports.handler = async function(event, context) {
    const data = JSON.parse(event.body);
    const { to, trackingNumber, nombreCliente, destino, valor } = data;

    try {
        const message = await client.messages.create({
            body: `Hola ${nombreCliente}, tu paquete con destino a ${destino} ha sido registrado con el número de seguimiento ${trackingNumber}. Valor: $${valor}`,
            from: 'whatsapp:+50369228310', // Número de WhatsApp de tu empresa
            to: `whatsapp:${to}` // Número de la vendedora en formato de WhatsApp
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
