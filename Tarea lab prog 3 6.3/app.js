// Configuración inicial del gráfico
const ctx = document.getElementById('ventasChart').getContext('2d');
const ventasChart = new Chart(ctx, {
    type: 'bar', // Puedes cambiar 'bar' por 'line' o cualquier otro tipo compatible
    data: {
        labels: [], // Etiquetas de los meses
        datasets: [{
            label: 'Ventas',
            data: [], // Datos de ventas
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Función para agregar datos al gráfico
document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener valores del formulario
    const mes = document.getElementById('mes').value;
    const ventas = parseFloat(document.getElementById('ventas').value);

    // Agregar datos al gráfico
    ventasChart.data.labels.push(mes);
    ventasChart.data.datasets[0].data.push(ventas);

    // Actualizar el gráfico
    ventasChart.update();

    // Limpiar el formulario
    document.getElementById('dataForm').reset();
});