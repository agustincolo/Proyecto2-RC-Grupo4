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



// let filmsData = [
//   {
//     "id": "1",
//     "nombre": "Pelicula 1",
//     "categoria": "Acción",
//     "descripcion": "Una emocionante película de acción",
//     "publicado": 1
//   },
//   {
//     "id": "2",
//     "nombre": "Pelicula 2",
//     "categoria": "Comedia",
//     "descripcion": "Una divertida comedia para reír sin parar",
//     "publicado": 1
//   },
//   {
//     "id": "3",
//     "nombre": "Pelicula 3",
//     "categoria": "Drama",
//     "descripcion": "Una película conmovedora que te hará reflexionar",
//     "publicado": 0
//   },
//   {
//     "id": "4",
//     "nombre": "Pelicula 4",
//     "categoria": "Drama",
//     "descripcion": "Una película conmovedora que te hará reflexionar",
//     "publicado": 0
//   }
// ];


// localStorage.setItem("films", JSON.stringify(filmsData));
showInfo(JSON.parse(localStorage.getItem("films")))


function showInfo(films) {
  films.forEach(film => {
    result += `
                <tr>
                    <td id="id">${film.id}</td>
                    <td id="name">${film.nombre}</td>
                    <td id="category">${film.categoria}</td>
                    <td id="description">${film.descripcion}</td>
                    <td id="publicated">${film.publicado}</td>
                    <td class="class-center">
                      <a class="btnEdit btn btn-primary">
                        <i class="fa-solid fa-pen-to-square"></i>
                      </a>
                      <a class="btnDelete btn btn-danger">
                        <i class="fa-solid fa-trash-can"></i>
                      </a>
                      <a class="btnStar btn btn-warning">
                      <i class="fa-solid fa-star"></i>
                      </a>
                    </td>
                </tr>  `
    container.innerHTML = result 

    const btnDeleteList = container.querySelectorAll('.btnDelete');
    btnDeleteList.forEach(btnDelete => {
      btnDelete.addEventListener('click', () => {
        const filmId = film.id;
        let films = JSON.parse(localStorage.getItem("films"));
        let updatedFilms = films.filter(film => film.id !== filmId);
        localStorage.setItem("films", JSON.stringify(updatedFilms));
        location.reload();
      });
    })
    const btnEditList = container.querySelectorAll(".btnEdit");
    btnEditList.forEach(btnEdit => {
      btnEdit.addEventListener('click', () => {
          description.value = ""
          category.value = ""
          published.value = ""
          name_id.value = ""
          modaltableFilms.show()
        
      })
    })

  });
}


let arrayFilms = [];

function newFilm(data) {
  let safeData = localStorage.getItem("films");
  if (safeData != null) {
    let obj = JSON.parse(safeData);
    if (checkFilms(data.id)) 
    {
      console.log(`El film ${data.id} ya existe`)
    } 
    else 
    {
      arrayFilms = obj;
      arrayFilms.push(data);
      localStorage.setItem("films", JSON.stringify(arrayFilms));
    }
  } 
  else 
  {
      arrayFilms.push(data);
      localStorage.setItem("films", JSON.stringify(arrayFilms));
  }
};

function checkFilms(id_film) {
  let safeData = localStorage.getItem("films");
  let objData = JSON.parse(safeData)
  for (let i = 0; i < objData.length; i++) {
    if (id_film == objData[i].id) {
      return true
    }
  } return false
}



document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault()
  let cod_id = document.getElementById('cod_id').value
  console.log(cod_id)
  let name_id = document.getElementById('name_id').value
  let category_id = document.getElementById('category_id').value
  let description_id = document.getElementById('description_id').value
  let published_id = document.getElementById('published_id').value

  const data = {
    id : cod_id,
    nombre: name_id,
    categoria : category_id,
    descripcion : description_id,
    publicado : published_id
  }
  newFilm(data)
  location.reload();
})