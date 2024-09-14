const twilio = require('twilio');

// Credenciales de Twilio
const accountSid = 'AC6c6fb4d7e40a2b8220bfb2349605166e';  // Reemplaza con tu Account SID de Twilio
const authToken = '5d1221ef550c190993dd255c3dca8d8a';    // Reemplaza con tu Auth Token de Twilio

const client = twilio(accountSid, authToken);

exports.handler = async function(event, context) {
    const { to, trackingNumber } = JSON.parse(event.body);

    try {
        const message = await client.messages.create({
            body: `Tu número de seguimiento es: ${trackingNumber}`,  // Mensaje personalizado
            from: '(386) 333-6602',  // Número de teléfono de Twilio
            to: to  // Número de teléfono del destinatario
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Mensaje enviado con éxito', sid: message.sid }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error enviando el mensaje' }),
        };
    }
};
