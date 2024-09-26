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
            from: 'whatsapp:+50369228310', // Número de WhatsApp de Estrada Encomiendas
            to: `whatsapp:${to}`, // Número del destinatario
            template: {
                name: 'notificacion_paquete', // Nombre de la plantilla aprobada
                language: {
                    code: 'es' // Lenguaje en el que fue aprobada la plantilla
                },
                components: [
                    {
                        type: 'body',
                        parameters: [
                            { type: 'text', text: trackingNumber }, // Variable 1
                            { type: 'text', text: nombreCliente },  // Variable 2
                            { type: 'text', text: destino },        // Variable 3
                            { type: 'text', text: valor }           // Variable 4
                        ]
                    }
                ]
            }
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
