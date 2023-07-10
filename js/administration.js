const container = document.querySelector("tbody");
let result = ''

const modaltableFilms = new bootstrap.Modal(document.getElementById('modaltableFilms'))
const formFilms = document.querySelector('form')
const name_id = document.getElementById("name_id")
const category = document.getElementById("category_id")
const description = document.getElementById("description_id")
const published =  document.getElementById("published_id")
const cod_id = document.getElementById("cod_id")
let option = ''

btnCrear.addEventListener('click', () => {
  cod_id.value= ""
  description.value = ""
  category.value = ""
  published.value = ""
  name_id.value = ""
  modaltableFilms.show()
  option = 'create'
})

if (JSON.parse(localStorage.getItem("films")) !== null) {
  showInfo(JSON.parse(localStorage.getItem("films")))
}

function showInfo(films) {
  films.forEach(film => {
    result += `
                <tr data-film-I="${film.id}">
                    <td id="id" >${film.id}</td>
                    <td id="name">${film.nombre}</td>
                    <td id="category">${film.categoria}</td>
                    <td id="description">${film.descripcion}</td>
                    <td id="publicated">
                    <i class="fa-regular ${film.publicado == 'Si' ? "fa-circle-check" :"fa-circle-xmark"}" id="buttons"></i>
                    </td>
                    <td class="class-center">
                      <a class="btnEdit btn btn-primary" data-film-D="${film.descripcion}" data-film-C="${film.categoria}" data-film-id="${film.id}"
                      data-film-P="${film.publicado}" data-film-N= "${film.nombre}">
                        <i class="fa-solid fa-pen-to-square"></i>
                      </a>
                      <a class="btnDelete btn btn-danger" data-film-id="${film.id}">
                        <i class="fa-solid fa-trash-can"></i>
                      </a>
                      <a class="btnStar btn btn-warning" data-film-I="${film.id}" data-film-S="${film.star}">
                      <i class="fa-solid fa-star"></i>
                      </a>
                    </td>
                </tr>  `
    container.innerHTML = result 

    const btnDeleteList = container.querySelectorAll('.btnDelete');
    btnDeleteList.forEach(btnDelete => {
      btnDelete.addEventListener('click', () => {
        const filmId = btnDelete.dataset.filmId;
        let films = JSON.parse(localStorage.getItem("films"));
        let updatedFilms = films.filter(film => film.id !== filmId);
        localStorage.setItem("films", JSON.stringify(updatedFilms));
        location.reload();
      });
    })
    const btnEditList = container.querySelectorAll(".btnEdit");
    btnEditList.forEach(btnEdit => {
      btnEdit.addEventListener('click', () => {
          description.value = btnEdit.dataset.filmD
          category.value = btnEdit.dataset.filmC
          published.value = btnEdit.dataset.filmP
          name_id.value = btnEdit.dataset.filmN
          cod_id.value = btnEdit.dataset.filmId
          option = "edit"
          modaltableFilms.show()
      })
    })
    let on = null
    let first = true
    const filmsStar = JSON.parse(localStorage.getItem('films'))
    const filmStar = filmsStar.find(f => f.star == true)
    const btnStarList = container.querySelectorAll(".btnStar");

    if (filmStar) {
      const tdElements = document.querySelectorAll(`tr[data-film-I="${filmStar.id}"] td`);
          tdElements.forEach(tdElement => {
            tdElement.classList.add("star");
          });
      console.log(btnStarList)
      btnStarList.forEach(btnStar => {
        if (btnStar.dataset.filmS == "true") on = btnStar
      })
          
      first = false
    }
  
    
    btnStarList.forEach(btnStar => {
      btnStar.addEventListener('click', () => {
        if (on !== btnStar && first) { 
          on = btnStar;
          on.classList.add("selected");
          const filmId = on.dataset.filmI;
          const films = JSON.parse(localStorage.getItem('films'))
          const tdElements = document.querySelectorAll(`tr[data-film-I="${filmId}"] td`);
          tdElements.forEach(tdElement => {
            tdElement.classList.add("star");
          });
          
          const film = films.find(f => f.id == filmId)
          if (film) {
            film.star = true
            localStorage.setItem('films', JSON.stringify(films))
          }
          first = false;
          
        } else {
          console.log(on, btnStar)
          if (on == btnStar) {
            on.classList.remove("selected");
            on = null;
            const filmId = btnStar.dataset.filmI;
            const tdElements = document.querySelectorAll(`tr[data-film-I="${filmId}"] td`);
            tdElements.forEach(tdElement => {
            tdElement.classList.remove("star"); })
            const films = JSON.parse(localStorage.getItem('films'))
            const film = films.find(f => f.id == filmId)
            if (film) {
              film.star = false
              localStorage.setItem('films', JSON.stringify(films))
            }
            first = true
          }
        }}
      )
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
    console.log("entre")
      console.log(data)
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
  let cod_id_c = document.getElementById('cod_id').value
  let name_id_c = document.getElementById('name_id').value
  let category_id = document.getElementById('category_id').value
  let description_id = document.getElementById('description_id').value
  let published_id = document.getElementById('published_id').value
  if (option == "create"){
    const data = {
      id : cod_id_c,
      nombre: name_id_c,
      categoria : category_id,
      descripcion : description_id,
      publicado : published_id,
      star: false
    }
  newFilm(data)
  location.reload();
} else if (option == "edit") {
    description.value = document.getElementById('description_id').value
    category.value = document.getElementById('category_id').value
    published.value = document.getElementById('published_id').value
    name_id.value = document.getElementById('name_id').value
    cod_id.value = document.getElementById('cod_id').value
    let films = JSON.parse(localStorage.getItem("films"));
    const update = films.map(film => {
      if (cod_id.value == film.id) {
        film.descripcion = description.value
        film.publicado = published.value
        film.nombre = name_id.value
        film.categoria = category.value
      }
      return film
    });
    localStorage.setItem("films", JSON.stringify(update))
    modaltableFilms.hide()
    location.reload();
}
})
