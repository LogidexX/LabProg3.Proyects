function generateQR() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    if (name && phone && email) {
        const vCardData = `BEGIN:VCARD
VERSION:3.0
N:${name}
TEL:${phone}
EMAIL:${email}
END:VCARD`;

        const qr = new QRious({
            element: document.getElementById("qr-code"),
            size: 200,
            value: vCardData
        });

        alert("Código QR generado. Escanéalo para agregar el contacto.");
    } else {
        alert("Por favor, completa todos los campos del formulario.");
    }
}