let bandera = false;

document.getElementById("generarCarnet").addEventListener("click", async function () {
    resetForm();

    if (!validateForm()) {
        return;
    }

    await generarCarnet();
});

function generarCarnet() {
    return new Promise((resolve, reject) => {
        if (bandera) {
            resolve(); // Ya está en proceso, simplemente resuelve la promesa
            return;
        }

        bandera = true;

        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const fechaNacimiento = document.getElementById("fechaNacimiento").value;
        const dni = document.getElementById("dni").value;
        const escuela = document.getElementById("escuela").value;
        const opcion = document.getElementById("opcion").value;

        var imageInput = document.getElementById('imageInput');

        if (imageInput.files.length === 0) {
            alert('Por favor, seleccione una imagen.');
            bandera = false;
            reject('No se seleccionó ninguna imagen.');
            return;
        }

        var reader = new FileReader();

        reader.onload = function (e) {
            const pdf = new jsPDF({
                format: 'a4',
                unit: 'mm',
                orientation: 'landscape'
            });

            const rectFreWidth = 85;
            const rectFreHeight = 55;
            const pageFreWidth = pdf.internal.pageSize.width;
            const x0 = (pageFreWidth - rectFreWidth) / 2;
            const pageFreHeight = pdf.internal.pageSize.height;
            const y0 = (pageFreHeight - rectFreHeight) / 2;

            pdf.setFillColor(40, 116, 166);
            pdf.rect(x0 - 43, y0, rectFreWidth, rectFreHeight, 'F');

            const rectWidth = 85;
            const rectHeight = 55;
            const pageWidth = pdf.internal.pageSize.width;
            const x = (pageWidth - rectWidth) / 2;
            const pageHeight = pdf.internal.pageSize.height;
            const y = (pageHeight - rectHeight) / 2;

            pdf.rect(x + 43, y, rectWidth, rectHeight);

            // Imprimir el texto "CARNET DE MIEMBRO" en el centro del rectángulo
            pdf.setFont("times", "bold");
            pdf.setFontSize(11);
            pdf.text(x + 53, y + 8, "CREDENCIAL DE PRACTICANTE", {
                align: "center"
            });
            pdf.setFontSize(15);
            pdf.text(x - 13.5, y - 50, "UNION MEDITERRANEA DE TAEKWONDO", {
                align: "center"
            });
            // Insertar una línea debajo del texto
            const lineGran = 0.5; // Ajusta el grosor de la línea según sea necesario
            pdf.setLineWidth(lineGran);
            pdf.line(x - 15, y + - 45, x + 98, y - 45); // Ajusta las coordenadas según sea necesario 

            pdf.setTextColor(150, 174, 182);
            pdf.text(x -10, y + - 10, "FRENTE", {
                align: "center"
            });
            
            pdf.text(x + 75, y - 10, "DORSO", {
                align: "center"
            });

            pdf.setTextColor(255);
            pdf.setFontSize(8);
            pdf.text(x -35, y + 42, "FEDERACION INTERNACIONAL DE TAEKWONDO", {
                align: "center"
            });

            // Insertar una línea debajo del texto
            const lineHeight = 0.5; // Ajusta el grosor de la línea según sea necesario
            pdf.setLineWidth(lineHeight);
            pdf.line(x - 40, y + 45, x + 38, y + 45); // Ajusta las coordenadas según sea necesario        

            // Establecer el tamaño de fuente a 10 puntos y negrita para "UNION MEDITERRANEA DE TAEKWONDO"
            pdf.setFont("times", "bold");
            pdf.setFontSize(10);
            pdf.text(x - 37, y + 8, "UNION MEDITERRANEA DE TAEKWONDO", {
                align: "center",
                fontSize: 5
            });
            pdf.setFontSize(8.5);
            pdf.text(x -15 , y + 17, "Cordoba", {
                align: "center"
            });

            pdf.setFontSize(8.5);
            pdf.text(x , y + 17, "Argentina", {
                align: "center"
            });
            
            pdf.setFontSize(7);
            pdf.text(x - 39, y + 50, "Cortesía - Integridad - Perseverancia - Autocontrol - Espíritu Indomable", {
                align: "center",
                fontSize: 5
            });

            // Restablecer el color del texto a negro (opcional, si deseas que el color predeterminado sea negro)
            pdf.setTextColor(0);

            pdf.setFontSize(8);
            pdf.text(x - 40, y + 130, "Prohibida la venta, imprecion, reproduccion, comercializacion y modificacion de este documento. © UNION MEDITERRANEA DE CORDOBA", {
                align: "center"
            });

            // Agregar la imagen principal al PDF
            pdf.addImage(e.target.result, 'JPEG', x + 100, y + 17.5, 22, 22);

            // Crear una nueva imagen para la marca de agua
            const marcaAguaImage = new Image();
            marcaAguaImage.src = 'marca.png'; // Asegúrate de que la ruta sea correcta

            // Crear nuevas imágenes para las imágenes adicionales
            const itf = new Image();
            itf.src = 'ITF.png'; // Asegúrate de que la ruta sea correcta

            const union = new Image();
            union.src = 'union.png'; // Asegúrate de que la ruta sea correcta

            const log1 = new Image();
            log1.src = 'log1.png'; // Asegúrate de que la ruta sea correcta

            const log2 = new Image();
            log2.src = 'log2.png'; // Asegúrate de que la ruta sea correcta

            const log3 = new Image();
            log3.src = 'log3.png'; // Asegúrate de que la ruta sea correcta

            const log4 = new Image();
            log4.src = 'log4.png'; // Asegúrate de que la ruta sea correcta

            const log5 = new Image();
            log5.src = 'log5.png'; // Asegúrate de que la ruta sea correcta


            marcaAguaImage.onload = function () {
                pdf.addImage(marcaAguaImage, 'PNG', x + 64, y + 9, 35, 35);

                itf.src = 'ITF.png';
                union.src = 'union.png';
                log1.src = 'log1.png';
                log2.src = 'log2.png';
                log3.src = 'log3.png';
                log4.src = 'log4.png';
                log5.src = 'log5.png';

                log5.onload = function () {
                    pdf.addImage(itf, 'PNG', x - 55, y - 70, 35, 35);
                    pdf.addImage(union, 'PNG', x + 105, y - 70, 35, 35);
                    pdf.addImage(log1, 'PNG', x + 17, y + 13, 22, 22);
                    pdf.addImage(log2, 'PNG', x, y + 20, 13, 13);
                    pdf.addImage(log3, 'PNG', x - 41, y + 13, 21, 21);
                    pdf.addImage(log4, 'PNG', x - 15, y + 20, 13, 13);
                    pdf.addImage(log5, 'PNG', x - 55, y + 50, 200, 90);

                     // Establecer el tamaño de fuente a 6 puntos y negrita para "Nombre"
                     pdf.setFont("times", "bold");
                     pdf.setFontSize(10);
                     pdf.text(x + 48, y + 16, "Nombre: ", {
                         align: "left"
                     });

                     // Restablecer el estilo de la fuente a normal
                     pdf.setFont("times", "normal");

                     // Imprimir el nombre sin negrita
                     pdf.text(x + 63, y + 16, nombre + " " + apellido, {
                         align: "left"
                     });

                     // Imprimir el texto "Fecha de nacimiento: " seguido de la fecha de nacimiento del usuario
                     // Establecer el tamaño de fuente a 6 puntos y negrita para "F.N"
                     pdf.setFont("times", "bold");
                     pdf.setFontSize(10);
                     pdf.text(x + 48, y + 23, "F.N: ", {
                         align: "center"
                     });

                     // Restablecer el estilo de la fuente a normal
                     pdf.setFont("times", "normal");

                     // Imprimir la fecha de nacimiento sin negrita
                     pdf.text(x + 57, y + 23, fechaNacimiento.toLocaleString(), {
                         align: "center"
                     });

                     // Establecer el tamaño de fuente a 6 puntos y negrita para "DNI"
                     pdf.setFont("times", "bold");
                     pdf.setFontSize(10);
                     pdf.text(x + 48, y + 30, "DNI: ", {
                         align: "center"
                     });
                     
                     // Restablecer el estilo de la fuente a normal
                     pdf.setFont("times", "normal");

                     // Imprimir el número de DNI sin negrita
                     pdf.text(x + 57, y + 30, dni, {
                         align: "center"
                     });

                     // Imprimir el texto "Escuela: " en negrita
                     pdf.setFont("times", "bold");
                     pdf.setFontSize(10);
                     pdf.text(x + 48, y + 37, "Escuela: ", {
                         align: "left"
                     });

                     // Restablecer el estilo de la fuente a normal
                     pdf.setFont("times", "normal");

                     // Imprimir el nombre de la escuela sin negrita
                     pdf.text(x + 62, y + 37, escuela, {
                         align: "left"
                     });

                     pdf.setFontSize(10);
                     // Imprimir el texto "Grado: " en negrita
                     pdf.setFont("times", "bold");

                     pdf.text(x + 48, y + 44, "Grado: ", {
                         align: "left"
                     });

                     // Restablecer el estilo de la fuente a normal
                     pdf.setFont("times", "normal");

                     // Imprimir la opción sin negrita
                     pdf.text(x + 60, y + 44, opcion, {
                         align: "left"
                     });

                     // Establecer el tamaño de fuente a 6 puntos para "Vigencia"
                     pdf.setFontSize(8);
                     pdf.setFont("times", 6);
                     pdf.text(x + 75, y + 51, "Vigencia 2024", {
                         align: "center"
                     });

                    pdf.save('CarnetDigital.pdf');
                    bandera = false;
                    resolve();
                };

                log5.src = 'log5.png';
            };

            marcaAguaImage.src = 'marca.png';
        };

        reader.readAsDataURL(imageInput.files[0]);
        resetearFormulario()
    });
}






function resetearFormulario() {
    // Restablecer valores de campos
    document.getElementById('formulario').reset();

    // Restablecer clases y estilos
    inputs.forEach((input) => {
        const campo = input.name;
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto', 'formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle', 'fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = false;
    });

    // Restablecer mensaje de error general
    document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');

    // Desmarcar el checkbox de términos
    terminosCheckbox.checked = false;
}