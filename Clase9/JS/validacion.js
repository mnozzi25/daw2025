
document.addEventListener("DOMContentLoaded", function () {
  var campos = [
    "nombreCompleto", "email", "password", "repetirPassword",
    "edad", "telefono", "direccion", "ciudad", "codigoPostal", "dni"
  ];

  for (var i = 0; i < campos.length; i++) {
    var input = document.getElementById(campos[i]);
    input.addEventListener("blur", function () {
      validarCampo(this.id);
    });
    input.addEventListener("focus", function () {
      limpiarError(this.id);
    });
  }

  document.getElementById("formularioSuscripcion").addEventListener("submit", function (e) {
    e.preventDefault();
    var errores = [];

    for (var i = 0; i < campos.length; i++) {
      var error = validarCampo(campos[i]);
      if (error !== "") {
        errores.push(error);
      }
    }

    if (errores.length > 0) {
      alert("Hay errores en el formulario:\n" + errores.join("\n"));
    } else {
      alert("Formulario enviado correctamente.");
    }
  });
});

function validarCampo(id) {
  var valor = document.getElementById(id).value.trim();
  var errorSpan = document.getElementById("error" + id.charAt(0).toUpperCase() + id.slice(1));
  var mensaje = "";

  if (valor === "") {
    mensaje = "Este campo es obligatorio.";
  } else {
	if (id === "nombreCompleto" && (!/^.{7,}$/.test(valor) || !valor.includes(" "))) {
    mensaje = "Debe tener más de 6 letras y un espacio.";
    }
    if (id === "email" && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor))) {
      mensaje = "Debe ser un email válido.";
    }
    if (id === "password" && (!/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(valor))) {
      mensaje = "La contraseña debe tener al menos 8 caracteres con letras y números.";
    }
    if (id === "repetirPassword" && valor !== document.getElementById("password").value) {
      mensaje = "Las contraseñas no coinciden.";
    }
    if (id === "edad" && parseInt(valor) < 18) {
      mensaje = "Debes ser mayor de edad.";
    }
	if (id === "telefono" && (!/^\d{7,}$/.test(valor))) {
      mensaje = "Mínimo 7 dígitos, sin símbolos.";
    }
	if (id === "direccion" && (!/^.*[A-Za-z].*\s.*[0-9].*$|^.*[0-9].*\s.*[A-Za-z].*$/.test(valor) || valor.length < 5)) {
      mensaje = "Debe tener letras, números y un espacio.";
    }
	if (id === "ciudad" && (valor.length < 3)) {
      mensaje = "Debe tener al menos 3 caracteres.";
    }
	if (id === "codigoPostal" && (valor.length < 3)) {
      mensaje = "Debe tener al menos 3 caracteres.";
    }
    if (id === "dni" && (!/^\d{7,8}$/.test(valor))) {
      mensaje = "Debe ser un número de 7 u 8 dígitos.";
    }
  }

  errorSpan.textContent = mensaje;
  return mensaje;
}

function limpiarError(id) {
  var errorSpan = document.getElementById("error" + id.charAt(0).toUpperCase() + id.slice(1));
  errorSpan.textContent = "";
}
