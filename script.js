// Seleccionar el formulario
document.getElementById('dataForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Evitar que la página se recargue

    // Obtener los datos del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Enviar los datos al servidor mediante una solicitud POST
    try {
        const response = await fetch('http://localhost:3000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        });

        // Analizar la respuesta del servidor
        const result = await response.json();

        // Mostrar el mensaje al usuario
        if (response.ok) {
            document.getElementById('responseMessage').innerText = result.message;
            document.getElementById('responseMessage').style.color = 'green';
        } else {
            document.getElementById('responseMessage').innerText = result.message || 'Error al enviar los datos';
            document.getElementById('responseMessage').style.color = 'red';
        }

    } catch (error) {
        console.error('Error al enviar los datos:', error);
        document.getElementById('responseMessage').innerText = 'Error al conectar con el servidor.';
        document.getElementById('responseMessage').style.color = 'red';
    }
});