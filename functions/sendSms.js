const twilio = require('twilio');

// Credenciales de Twilio desde variables de entorno
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

exports.handler = async function(event, context) {
    // Depuración: Mostrar lo que está llegando en el cuerpo de la solicitud
    console.log("Cuerpo recibido:", event.body);

    try {
        // Verificar si el cuerpo de la solicitud está vacío
        if (!event.body) {
            throw new Error("Cuerpo de la solicitud vacío");
        }

        // Parsear el cuerpo de la solicitud
        const { to, trackingNumber } = JSON.parse(event.body);

        // Verificar si los valores están presentes
        if (!to || !trackingNumber) {
            throw new Error("Faltan campos 'to' o 'trackingNumber'");
        }

        // Crear y enviar el mensaje usando Twilio
        const message = await client.messages.create({
            body: `Tu número de seguimiento es: ${trackingNumber}`,
            from: '+[tu-número-de-Twilio]',  // Reemplaza con tu número de Twilio
            to: to
        });

        // Responder con éxito
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
