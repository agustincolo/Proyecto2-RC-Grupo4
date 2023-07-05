const container = document.querySelector("tbody");
let result = ''

const modaltableFilms = new bootstrap.Modal(document.getElementById('modaltableFilms'))
const formFilms = document.querySelector('form')
const name_id = document.getElementById("name_id")
const category = document.getElementById("category_id")
const description = document.getElementById("description_id")
const published =  document.getElementById("published_id")
let option = ''

btnCrear.addEventListener('click', () => {
  description.value = ""
  category.value = ""
  published.value = ""
  name_id.value = ""
  modaltableFilms.show()
  option = 'create'
})


let filmsData = [
  {
    "id": "1",
    "nombre": "Pelicula 1",
    "categoria": "Acción",
    "descripcion": "Una emocionante película de acción",
    "publicado": 1
  },
  {
    "id": "2",
    "nombre": "Pelicula 2",
    "categoria": "Comedia",
    "descripcion": "Una divertida comedia para reír sin parar",
    "publicado": 1
  },
  {
    "id": "3",
    "nombre": "Pelicula 3",
    "categoria": "Drama",
    "descripcion": "Una película conmovedora que te hará reflexionar",
    "publicado": 0
  },
  {
    "id": "4",
    "nombre": "Pelicula 4",
    "categoria": "Drama",
    "descripcion": "Una película conmovedora que te hará reflexionar",
    "publicado": 0
  }
];


localStorage.setItem("films", JSON.stringify(filmsData));
showInfo(filmsData)


function showInfo(films) {
  films.forEach(film => {
    result += `
                <tr>
                    <td>${film.id}</td>
                    <td>${film.nombre}</td>
                    <td>${film.categoria}</td>
                    <td>${film.descripcion}</td>
                    <td>${film.publicado}</td>
                    <td class="class-center"><a class="btnEdit btn btn-primary">Editar</a><a class="btnDelete btn btn-danger">Eliminar</a></td>
                </tr>  `
    container.innerHTML = result 

    const btnDelete = container.querySelector('.btnDelete');

    btnDelete.addEventListener('click', () => {
      const filmId = film.id;
      console.log(filmId);
      let films = JSON.parse(localStorage.getItem("films"));
      let updatedFilms = films.filter(film => film.id !== filmId);
      localStorage.setItem("films", JSON.stringify(updatedFilms));
    });

  });
} 