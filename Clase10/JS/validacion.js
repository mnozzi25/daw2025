
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


window.onload = function () {
  const form = document.getElementById("formularioSuscripcion");
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  const responseContainer = document.getElementById("serviceResponse");
  const modalTitulo = document.getElementById("modalTitulo");

  const savedData = JSON.parse(localStorage.getItem("suscripcionData"));
  if (savedData) {
    for (let key in savedData) {
      const input = document.getElementById(key);
      if (input) input.value = savedData[key];
    }
  }

  overlay.addEventListener("click", () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const datos = {
      nombreCompleto: document.getElementById("nombreCompleto").value.trim(),
      email: document.getElementById("email").value.trim(),
      password: document.getElementById("password").value,
      repetirPassword: document.getElementById("repetirPassword").value,
      edad: document.getElementById("edad").value,
      telefono: document.getElementById("telefono").value,
      direccion: document.getElementById("direccion").value,
      ciudad: document.getElementById("ciudad").value,
      codigoPostal: document.getElementById("codigoPostal").value,
      dni: document.getElementById("dni").value,
    };

	fetch("https://jsonplaceholder.typicode.com/posts", {
	  method: "POST",
	  headers: {
		"Content-Type": "application/json"
	  },
	  body: JSON.stringify(datos)
	})
      .then(response => {
        if (!response.ok) throw new Error(`Código ${response.status}`);
        return response.json();
      })
      .then(data => {
        modalTitulo.textContent = "Suscripción exitosa";
        responseContainer.textContent = JSON.stringify(data, null, 2);
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
        localStorage.setItem("suscripcionData", JSON.stringify(datos));
      })
      .catch(error => {
        modalTitulo.textContent = "Error en la suscripción";
        responseContainer.textContent = error.message;
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
      });
  });
};
