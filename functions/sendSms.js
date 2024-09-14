const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

exports.handler = async function(event, context) {
    try {
        if (!event.body) {
            throw new Error("Cuerpo de la solicitud vacío");
        }

        // Parsear el cuerpo de la solicitud
        const { to, trackingNumber } = JSON.parse(event.body);

        if (!to || !trackingNumber) {
            throw new Error("Faltan campos 'to' o 'trackingNumber'");
        }

        // Enviar el SMS usando Twilio
        const message = await client.messages.create({
            body: `Tu número de seguimiento es: ${trackingNumber}`,
            from: '+13863336602',  // Número de Twilio proporcionado
            to: to
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Mensaje enviado con éxito', sid: message.sid }),
        };
    } catch (error) {
        console.error('Error al enviar el SMS:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error enviando el mensaje', details: error.message }),
        };
    }
};

