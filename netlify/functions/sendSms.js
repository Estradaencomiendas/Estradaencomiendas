const twilio = require('twilio');


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

if (!accountSid || !authToken) {
    throw new Error('Las credenciales de Twilio no están configuradas correctamente');
}

const client = twilio(accountSid, authToken);

exports.handler = async function(event, context) {
    try {
        if (!event.body) {
            throw new Error("Cuerpo de la solicitud vacío");
        }

        const { to, trackingNumber } = JSON.parse(event.body);

        if (!to || !trackingNumber) {
            throw new Error("Faltan campos 'to' o 'trackingNumber'");
        }

        const message = await client.messages.create({
            body: `Tu número de seguimiento es: ${trackingNumber}`,
            from: '+[tu-número-de-Twilio]',  // Reemplaza con el número de Twilio
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

