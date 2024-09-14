const twilio = require('twilio');

// Credenciales de Twilio
const accountSid = 'AC6c6fb4d7e40a2b8220bfb2349605166e';  // Reemplaza con tu Account SID
const authToken = 'd9bb49a6b1081d478988940da1a5a435';    // Reemplaza con tu Auth Token
const client = twilio(accountSid, authToken);

exports.handler = async function(event, context) {
    const { to, trackingNumber } = JSON.parse(event.body);  // 'to' es el número de teléfono destinatario

    try {
        const message = await client.messages.create({
            body: `Tu número de seguimiento es: ${trackingNumber}`,  // El cuerpo del mensaje
            from: '+13863336602',  // El número de Twilio que compraste
            to: to  // Número de teléfono del destinatario (debe estar en formato E.164, por ejemplo, +503xxxxxxxx)
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Mensaje enviado con éxito', sid: message.sid }),
        };
    } catch (error) {
        console.error('
