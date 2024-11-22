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
