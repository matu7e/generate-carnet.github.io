const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{4,16}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{4,16}$/, // Letras y espacios, pueden llevar acentos.
    dni: /^[0-9]{8,8}$/, // 8 dígitos.
    escuela: /^[a-zA-ZÀ-ÿ\s]{4,16}$/ // 4 a 16 caracteres.
}

const campos = {
    nombre: false,
    apellido: false,
    dni: false,
    escuela: false
}

const terminosCheckbox = document.getElementById('terminos');

terminosCheckbox.addEventListener('change', () => {
    if (terminosCheckbox.checked) {
        document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
});

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "apellido":
            validarCampo(expresiones.apellido, e.target, 'apellido');
            break;
        case "dni":
            validarCampo(expresiones.dni, e.target, 'dni');
            break;
        case "escuela":
            validarCampo(expresiones.escuela, e.target, 'escuela');
            break;
    }

    // Verificar si algún campo es inválido
    const camposInvalidos = Object.values(campos).some((campo) => campo === false);

    // Verificar si el checkbox de términos no está marcado
    const terminosNoMarcados = !terminosCheckbox.checked;

    // Mostrar el mensaje de error general si es necesario
    if (camposInvalidos || terminosNoMarcados) {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    } else {
        document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        console.log(`Campo ${campo} válido`);
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        console.log(`Campo ${campo} inválido`);
        campos[campo] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

function validateForm() {
    if (!campos.nombre || !campos.apellido || !campos.dni || !campos.escuela || !terminosCheckbox.checked) {
        // Mostrar mensajes de error específicos para indicar los problemas
        console.log('Validación del formulario fallida');
        return false;
    }
    return true;
}

// Agregar un evento de clic al botón de descarga del PDF
const botonDescargarPDF = document.getElementById('botonDescargarPDF');

// Función para manejar el clic en el botón de descarga del PDF
const handleDescargarPDFClick = () => {
    validarYGenerarCarnet();
    // Puedes agregar más acciones aquí si es necesario
};

// Agregar el evento de clic al botón
botonDescargarPDF.addEventListener('click', handleDescargarPDFClick);

function validarYGenerarCarnet() {
    if (validateForm()) {
        generarCarnet();
        // Quitar el evento después de generación del carné
        
    } else {
        // Manejar el caso en el que la validación falla
        console.log('Error en la validación del formulario');
    }
}



