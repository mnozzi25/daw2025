var urlBase = 'https://rickandmortyapi.com/api/character';

document.getElementById('btnTodos').addEventListener('click', function () {
  fetchPersonajes(urlBase);
});

document.getElementById('btnFiltrar').addEventListener('click', function () {
  var name = document.getElementById('name').value;
  var status = document.getElementById('status').value;
  var species = document.getElementById('species').value;
  var type = document.getElementById('type').value;
  var gender = document.getElementById('gender').value;

  var urlConFiltros = urlBase + '?name=' + name + '&status=' + status + '&species=' + species + '&type=' + type + '&gender=' + gender;
  fetchPersonajes(urlConFiltros);
});

function fetchPersonajes(url) {
  fetch(url)
    .then(function (res) {
      if (!res.ok) throw new Error("Error al obtener los personajes");
      return res.json();
    })
    .then(function (data) {
      mostrarPersonajes(data.results);
    })
    .catch(function (error) {
      mostrarError(error.message);
    });
}

function mostrarPersonajes(personajes) {
  var contenedor = document.getElementById('resultado');
  contenedor.innerHTML = '';

  personajes.forEach(function (p) {
    var div = document.createElement('div');
    div.className = 'personaje';
    div.innerHTML = `
      <h3>${p.name}</h3>
      <img src="${p.image}" alt="${p.name}" width="100">
      <p><strong>Estado:</strong> ${p.status}</p>
      <p><strong>Especie:</strong> ${p.species}</p>
    `;
    contenedor.appendChild(div);
  });
}

function mostrarError(mensaje) {
  var contenedor = document.getElementById('resultado');
  contenedor.innerHTML = '<p style="color: red;">' + mensaje + '</p>';
}
