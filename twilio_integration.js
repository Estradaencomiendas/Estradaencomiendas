document.getElementById('package-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Obtener los datos del formulario
    const nombreCliente = document.getElementById('nombreCliente').value;
    const nombrePaquete = document.getElementById('nombrePaquete').value;
    const destino = document.getElementById('destino').value;
    const diaEntrega = document.getElementById('dia-entrega').value;
    const valor = document.getElementById('valor').value;
    const valorEnvio = document.getElementById('valorEnvio').value;
    const telefonoVendedora = document.getElementById('telefonoVendedora').value;  // Número del destinatario

    // Generar la fecha de envío automáticamente
    const fechaEnvio = new Date().toISOString().split('T')[0];

    // Generar un número de seguimiento único
    const trackingNumber = 'PKG-' + Date.now();

    // Almacenar los datos del paquete en localStorage
    const packageData = {
        trackingNumber,
        nombreCliente,
        nombrePaquete,
        destino,
        fechaEnvio,
        diaEntrega,
        valor,
        valorEnvio
    };

    let packages = JSON.parse(localStorage.getItem('packages')) || [];
    packages.push(packageData);
    localStorage.setItem('packages', JSON.stringify(packages));

    // Enviar SMS con Twilio
    try {
        const response = await fetch('/.netlify/functions/sendSms', {
            method: 'POST',
            body: JSON.stringify({
                to: telefonoVendedora,  // Número del destinatario ingresado por el usuario
                trackingNumber: trackingNumber
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error enviando el SMS');
        }

        const result = await response.json();
        console.log('SMS enviado con éxito:', result);

        // Redirigir a la página de resultados con el número de seguimiento
        window.location.href = `resultados.html?trackingNumber=${trackingNumber}`;
    } catch (error) {
        console.error('Error al enviar el SMS:', error);
    }
});

