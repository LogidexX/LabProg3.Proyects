// Obtener los elementos del DOM
const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');
const optionForm = document.getElementById('optionForm');
const userOptions = document.getElementById('userOptions');

// Cargar usuarios y opciones al iniciar
document.addEventListener('DOMContentLoaded', loadUsers);
document.addEventListener('DOMContentLoaded', loadOptions);

// Añadir usuario
userForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const selectedOption = userOptions.value;

    // Crear objeto de usuario
    const user = {
        username,
        email,
        selectedOption
    };

    // Guardar en localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    // Limpiar formulario y recargar lista
    userForm.reset();
    loadUsers();
});

// Cargar usuarios desde localStorage
function loadUsers() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    userList.innerHTML = '';

    users.forEach((user, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.selectedOption}</td>
            <td class="actions">
                <button class="edit" onclick="editUser(${index})">Editar</button>
                <button class="delete" onclick="deleteUser(${index})">Eliminar</button>
            </td>
        `;

        userList.appendChild(row);
    });
}

// Añadir nueva opción al menú
optionForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const newOption = document.getElementById('newOption').value;

    // Guardar opción en localStorage
    let options = JSON.parse(localStorage.getItem('options')) || [];
    options.push(newOption);
    localStorage.setItem('options', JSON.stringify(options));

    // Limpiar formulario y recargar opciones
    optionForm.reset();
    loadOptions();
});

// Cargar opciones de menú desde localStorage
function loadOptions() {
    let options = JSON.parse(localStorage.getItem('options')) || [];
    userOptions.innerHTML = '';

    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        userOptions.appendChild(optionElement);
    });
}

// Editar usuario
function editUser(index) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users[index];

    document.getElementById('username').value = user.username;
    document.getElementById('email').value = user.email;
    userOptions.value = user.selectedOption;

    // Eliminar usuario para actualizar luego
    deleteUser(index);
}

// Eliminar usuario
function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    loadUsers();
}