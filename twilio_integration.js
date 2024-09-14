document.getElementById('paqueteForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Evita que el formulario se envíe de forma predeterminada

    const valorEnvio = document.getElementById('valor_envio').value;
    const whatsappVendedora = document.getElementById('whatsapp_vendedora').value;

    // Genera un número de seguimiento
    const numeroSeguimiento = 'EC-' + Math.floor(Math.random() * 1000000);

    // Mensaje a enviar
    const mensaje = `Tu paquete con número de seguimiento ${numeroSeguimiento} tiene un valor de $${valorEnvio}.`;

    // Llamada a la función para enviar el mensaje usando Twilio
    enviarMensajeWhatsApp(whatsappVendedora, mensaje);
});

async function enviarMensajeWhatsApp(numeroDestino, mensaje) {
    const accountSid = 'AC6c6fb4d7e40a2b8220bfb2349605166e';  // Reemplázalo con tu Account SID
    const authToken = 'd9bb49a6b1081d478988940da1a5a435';  // Reemplázalo con tu Auth Token

    // La API de Twilio a la que vamos a hacer la solicitud
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

    // Los datos que enviaremos a la API
    const body = new URLSearchParams({
        'To': `whatsapp:${numeroDestino}`,  // Número de destino en formato WhatsApp
        'From': 'whatsapp:+13863336602',  // Número de Twilio de WhatsApp (reemplaza si usas SMS)
        'Body': mensaje
    });

    // Hacemos la solicitud HTTP POST a la API de Twilio
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`),  // Autenticación con Basic Auth
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body.toString()
    });

    if (response.ok) {
        document.getElementById('mensaje_status').textContent = 'Mensaje enviado correctamente!';
    } else {
        document.getElementById('mensaje_status').textContent = 'Error enviando mensaje: ' + (await response.text());
    }
}
