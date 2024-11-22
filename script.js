// Obtener elementos del DOM
const contactForm = document.getElementById('contactForm');
const contactList = document.getElementById('contactUl');
const contactModal = document.getElementById('contactModal');
const closeBtn = document.getElementById('closeBtn');
const contactDetails = document.getElementById('contactDetails');
const searchField = document.getElementById('search');
const submitBtn = document.getElementById('submitBtn');
const editBtn = document.getElementById('editBtn');
const deleteBtn = document.getElementById('deleteBtn');

let editingIndex = -1;  // Variable para controlar si estamos editando un contacto

// Cargar contactos desde localStorage
document.addEventListener('DOMContentLoaded', loadContacts);

// Evento para agregar o editar contacto
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const occupation = document.getElementById('occupation').value;

    if (!validatePhone(phone)) {
        alert('El teléfono no es válido');
        return;
    }

    if (!validateEmail(email)) {
        alert('El correo electrónico no es válido');
        return;
    }

    const newContact = { firstName, lastName, phone, email, address, occupation };
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    if (editingIndex === -1) {
        contacts.push(newContact);  // Agregar nuevo contacto
    } else {
        contacts[editingIndex] = newContact;  // Editar contacto existente
        editingIndex = -1;
    }

    localStorage.setItem('contacts', JSON.stringify(contacts));
    contactForm.reset();
    loadContacts();
    submitBtn.textContent = 'Agregar Contacto'; // Cambiar texto del botón
});

// Cargar contactos en la lista
function loadContacts() {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contactList.innerHTML = '';
    contacts.forEach((contact, index) => {
        const li = document.createElement('li');
        li.textContent = `${contact.firstName} ${contact.lastName} ${" | "} ${contact.occupation} ${" | "} ${contact.phone}`;
        li.addEventListener('click', () => showContactDetails(index));
        contactList.appendChild(li);
    });
}

// Mostrar detalles del contacto
function showContactDetails(index) {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    const contact = contacts[index];
    contactDetails.innerHTML = `
        <p><strong>Nombre:</strong> ${contact.firstName} ${contact.lastName}</p>
        <p><strong>Teléfono:</strong> ${contact.phone}</p>
        <p><strong>Correo:</strong> ${contact.email}</p>
        <p><strong>Dirección:</strong> ${contact.address}</p>
        <p><strong>Ocupación:</strong> ${contact.occupation}</p>
    `;
    editingIndex = index;  // Establecer el índice de edición
    submitBtn.textContent = 'Actualizar Contacto'; // Cambiar texto del botón
    contactModal.style.display = 'block';
}

// Cerrar ventana modal
closeBtn.onclick = () => {
    contactModal.style.display = 'none';
};

// Editar contacto
editBtn.onclick = () => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    const contact = contacts[editingIndex];
    document.getElementById('firstName').value = contact.firstName;
    document.getElementById('lastName').value = contact.lastName;
    document.getElementById('phone').value = contact.phone;
    document.getElementById('email').value = contact.email;
    document.getElementById('address').value = contact.address;
    document.getElementById('occupation').value = contact.occupation;
    contactModal.style.display = 'none';
};

// Eliminar contacto
deleteBtn.onclick = () => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    contacts.splice(editingIndex, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    loadContacts();
    contactModal.style.display = 'none';
};

// Buscar contactos
function searchContacts() {
    const query = searchField.value.toLowerCase();
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const filteredContacts = contacts.filter(contact => 
        contact.firstName.toLowerCase().includes(query) || 
        contact.lastName.toLowerCase().includes(query) || 
        contact.phone.includes(query)
    );
    displayContacts(filteredContacts);
}

// Mostrar contactos filtrados
function displayContacts(contacts) {
    contactList.innerHTML = '';
    contacts.forEach((contact, index) => {
        const li = document.createElement('li');
        li.textContent = `${contact.firstName} ${contact.lastName}`;
        li.addEventListener('click', () => showContactDetails(index));
        contactList.appendChild(li);
    });
}
