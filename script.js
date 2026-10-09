// Elementos del DOM
const btnIniciar = document.getElementById('btnIniciar');
const btnCrear = document.getElementById('btnCrear');
const formIniciar = document.getElementById('formIniciar');
const formCrear = document.getElementById('formCrear');
const cerrarIniciar = document.getElementById('cerrarIniciar');
const cerrarCrear = document.getElementById('cerrarCrear');
const botonesPrincipales = document.getElementById('botonesPrincipales');

function mostrar(el) {
    el.classList.remove('hidden');
    el.classList.add('animate-aparecer');
}

function ocultar(el) {
    el.classList.add('hidden');
    el.classList.remove('animate-aparecer');
}

// Mostrar formulario Iniciar Sesión
btnIniciar.addEventListener('click', () => {
    ocultar(formCrear);
    mostrar(formIniciar);
    ocultar(botonesPrincipales);
});

// Mostrar formulario Crear Cuenta
btnCrear.addEventListener('click', () => {
    ocultar(formIniciar);
    mostrar(formCrear);
    ocultar(botonesPrincipales);
});

// Cerrar formularios y volver a botones
cerrarIniciar.addEventListener('click', () => {
    ocultar(formIniciar);
    botonesPrincipales.classList.remove('hidden');
});

cerrarCrear.addEventListener('click', () => {
    ocultar(formCrear);
    botonesPrincipales.classList.remove('hidden');
});

// ========== Crear cuenta ==========
const formulario = document.getElementById('formulario-cliente');

formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const nombreCliente = document.getElementById('nombre').value;
    const correoCliente = document.getElementById('correo').value;
    const telefonoCliente = document.getElementById('telefono').value;
    const contraseñaCliente = document.getElementById('contrasena').value;

    try {
        const respuesta = await fetch('http://localhost:3000/api/clientes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre: nombreCliente,
                correo: correoCliente,
                telefono: telefonoCliente,
                contraseña: contraseñaCliente
            })
        });

        if (respuesta.ok) {
            alert('¡Cliente registrado exitosamente!');
            formulario.reset();
        }
    } catch (error) {
        alert('El servidor no responde. Revisa si está encendido.');
    }
});

// ========== Iniciar sesión ==========
formIniciar.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const correo = document.getElementById('correoLogin').value;
    const contrasena = document.getElementById('contrasenaLogin').value;

    try {
        const respuesta = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo, contrasena })
        });

        const datos = await respuesta.json();

        if (respuesta.ok) {
            alert(`✅ Bienvenido, ${datos.cliente.nombre}`);
            // Aquí puedes guardar el cliente en localStorage o redirigir
        } else {
            alert(`❌ ${datos.mensaje}`);
        }
    } catch (error) {
        alert('El servidor no responde. Revisa si está encendido.');
    }
});